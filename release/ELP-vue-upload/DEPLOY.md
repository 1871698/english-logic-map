# ELP Vue Deploy

这个压缩包包含运行当前 Vue 项目所需的最小文件集，以及已经构建好的 `dist/`。

## 运行环境

- Node.js 20+ 推荐
- npm 10+ 推荐

## 在实例上运行开发环境

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

或者直接执行：

```bash
chmod +x start.sh
./start.sh
```

然后访问：

```text
http://<你的实例IP>:5173
```

## 在实例上运行构建产物

重新构建：

```bash
npm install
npm run build
```

本地预览构建结果：

```bash
npm run preview -- --host 0.0.0.0 --port 4173
```

然后访问：

```text
http://<你的实例IP>:4173
```

## 已包含内容

- `src/`
- `dist/`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- `start.sh`
- `nginx.elp.conf`

## 未包含内容

- `node_modules/`
- 原始 docx 数据集
- 本机启动脚本
- 调试日志
