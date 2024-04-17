const fs = require("fs").promises;
const path = require("path");

// 定义docs目录的路径
const docsDir = path.join(__dirname, "docs/");
const outputFilePath = path.join(__dirname, "src/category.json");

// 异步递归函数，用于构建树形结构
async function buildTree(dir) {
  let entries = await fs.readdir(dir, { withFileTypes: true });
  let tree = entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    let node;
    if (entry.isDirectory()) {
      // 如果是目录，递归构建子目录
      node = {
        title: entry.name,
        children: await buildTree(fullPath), // 等待子目录构建完成
      };
    } else if (entry.name.endsWith(".md")) {
      // 如果是Markdown文件，创建一个叶子节点
      node = {
        title: entry.name.replace(".md", ""),
        key: fullPath
          .replace(docsDir, "")
          .replace(/\\/g, "/")
          .replace(/\//g, "/"),
        isLeaf: true,
      };
    }
    return node; // 返回Promise<node>
  });

  // 使用Promise.all等待所有子节点构建完成
  return (await Promise.all(tree)).filter(Boolean); // 过滤掉未定义的节点
}

// 构建树形结构并打印
buildTree(docsDir)
  .then((tree) => {
    // console.log(JSON.stringify(tree, null, 2));

    // 将结果写入category.json文件
    fs.writeFile(outputFilePath, JSON.stringify(tree, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing to category.json:", writeErr);
      } else {
        console.log("Successfully wrote to category.json");
      }
    });
  })
  .catch((error) => {
    console.error("Error building tree:", error);
  });
