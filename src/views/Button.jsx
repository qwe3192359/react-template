import { useEffect, useState } from "react";

function MyButton() {
  const [num, setNum] = useState(0);

  // useEffect(() => {
  //   console.log("effect");
  //   const timer = setInterval(() => {
  //     console.log(num);
  //   }, 1000);
  //   console.log("effect222 ");
  //   return () => {
  //     console.log("clean up");
  //     clearInterval(timer);
  //   };
  // }, [num]);

  // setTimeout(() => {
  //   console.log(num);
  //   setNum(666);
  // }, 1000);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log(num);
  //     setNum(num + 1);
  //   }, 1000);
  // }, []);
  useEffect(() => {
    setInterval(() => {
      // console.log(num);
      setNum(num + 1);
    }, 1000);
  }, []);

  async function copyTableToClipboard() {
    const table = document.getElementById("myTable");

    // 1. 生成纯文本内容（备用）
    // const plainText = Array.from(table.rows)
    //   .map(
    //     (row) =>
    //       Array.from(row.cells)
    //         .map((cell) => cell.innerText)
    //         .join("\t") // 用制表符分隔单元格
    //   )
    //   .join("\n"); // 用换行符分隔行
    const plainText = "姓名\t年龄\t性别\n姓名\t年龄\t性别";
    console.log(plainText);
    console.log("姓名\t年龄\t性别\n姓名\t年龄\t性别");

    // 2. 生成富文本内容（HTML格式）
    const htmlContent = `
      <html>
        <head>
          <style>
            table { border-collapse: collapse; }
            td, th { border: 1px solid black; padding: 5px; }
          </style>
        </head>
        <body>
          ${table.outerHTML}
        </body>
      </html>
    `;

    // 3. 将内容写入剪贴板
    try {
      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([plainText], { type: "text/plain" }),
        "text/html": new Blob([htmlContent], { type: "text/html" }),
      });
      await navigator.clipboard.write([clipboardItem]);
      // alert("表格已复制，可直接粘贴到Word中！");
    } catch (err) {
      console.error("复制失败:", err);
      alert("复制失败，请手动选择表格内容复制！");
    }
  }

  return (
    <div>
      <button onClick={copyTableToClipboard}>复制</button>
      <table id="myTable">
        <thead>
          <tr>
            <th>姓名</th>
            <th>年龄</th>
            <th>性别</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default MyButton;
