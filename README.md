# Creat：MDEC 整合包

NeoForge 21.1.248 / Minecraft 1.21.1 的 Create + AE2 + 农夫乐事整合包。
本仓库存放「配置 + 脚本 + 清单」，不存放 mods/备份等大文件。

## 目录
- versions/Creat：MDEC/          客户端实例（config、kubejs 在此跟踪）
- versions/Creat：MDEC/mods/    客户端 mods（忽略，本地保存）
- versions/Mechanomania-航空学/ 基座原包（只读参考，忽略）
- versions/Create-Delight-Remake/ 齿轮盛宴原包（只读参考，忽略）
- server-packs/Creat-MDEC-Server/ 服务端包（config、kubejs、启动脚本）
- _work/                         修复记录、移植清单、脚本工具（md/csv/json 跟踪）
- _backup/                       备份 zip（忽略）

## 常用
- 查看改动：git status
- 提交：git add -A && git commit -m "说明"
- 回滚单个文件：git checkout -- <文件>
- 看历史：git log --oneline

## 当前状态（2026-11-22）
- 客户端可进世界、地形生成正常
- KubeJS：CDR 脚本移植 82 个 + 胶水；startup/server 0 错误
- 服务端已建好并实测到 Done（mods 276）
- 未修：Distant Horizons × Chunky 冲突导致联机协议错误
  → 方案 A（客户端移除 Chunky）/ B（客户端移除 DH）待选
