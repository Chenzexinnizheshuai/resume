// 用法: node scripts/extract-pdf.mjs <path-to.pdf>
// 提取 PDF 文本层，按视觉行排序输出（用于把简历 PDF 转成结构化文本）
import fs from 'node:fs';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';

GlobalWorkerOptions.workerSrc = import.meta.resolve(
  'pdfjs-dist/legacy/build/pdf.worker.mjs',
);

const pdfPath = process.argv[2];
if (!pdfPath) {
  console.error('缺少参数: pdf 路径');
  process.exit(1);
}

const doc = await getDocument({ data: new Uint8Array(fs.readFileSync(pdfPath)) }).promise;

for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);
  const tc = await page.getTextContent();

  // 按 y 坐标聚类成行
  const lines = [];
  for (const item of tc.items) {
    if (!item.str || !item.str.trim()) continue;
    const [a, b, c, d, x, y] = item.transform;
    const fontSize = Math.hypot(a, b) || Math.abs(d);
    const tol = Math.max(2.5, fontSize * 0.55);
    let line = lines.find((l) => Math.abs(l.y - y) <= tol);
    if (!line) {
      line = { y, fontSize, parts: [] };
      lines.push(line);
    }
    line.fontSize = Math.max(line.fontSize, fontSize);
    line.parts.push({ x, str: item.str });
  }

  // 从上到下、从左到右输出
  lines.sort((l1, l2) => l2.y - l1.y);
  console.log(`\n===== 第 ${p} 页 =====`);
  for (const line of lines) {
    line.parts.sort((p1, p2) => p1.x - p2.x);
    const text = line.parts.map((pt) => pt.str).join('').replace(/\s+/g, ' ').trim();
    if (text) console.log(`[fs=${line.fontSize.toFixed(1)}] ${text}`);
  }
}
