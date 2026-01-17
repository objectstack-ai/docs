/ (Root)
├── index.md (站点首页：宏大叙事与生态导航)
│
├── 01-concepts/ (序厅：哲学与核心概念)
│   ├── 00-introduction.md (What is ObjectStack?)
│   ├── 01-core-values.md (Local-First, Protocol-Driven, AI-Native)
│   ├── 02-architecture.md (The Trinity: QL + UI + OS)
│   ├── 03-enterprise-patterns.md (协议如何描述复杂 ERP 业务)
│   └── 04-terminology.md (术语表)
│
├── 02-getting-started/ (新增：新手村 - 快速上手)
│   ├── 01-installation.md (如何启动 ObjectOS Kernel)
│   ├── 02-your-first-app.md (5分钟构建一个 CRM 模块)
│   ├── 03-development-workflow.md (CLI 使用、调试与热重载)
│   └── 04-deployment.md (Docker, Kubernetes 与边缘部署)
│
├── 03-specifications/ (正厅：核心协议规范 - The "Bible")
│   │  _intro.md (协议层总览：Intent over Implementation)
│   │
│   ├── 01-objectql/ (Data Protocol)
│   │   ├── 00-overview.md
│   │   ├── 01-schema-definition.md (Object, Fields, Relations)
│   │   ├── 02-advanced-types.md (Currency, Formula, Summary)
│   │   ├── 03-ast-structure.md (The JSON Wire Protocol)
│   │   ├── 04-analytics-protocol.md (Aggregation, Pivot, BI Cubes)
│   │   ├── 05-transaction-model.md (Atomic Mutation & Cross-Object Tx)
│   │   └── 06-security-injection.md (原理：Compile-time Permission Injection)
│   │
│   ├── 02-objectui/ (View Protocol)
│   │   ├── 00-overview.md (Server-Driven UI Philosophy)
│   │   ├── 01-component-schema.md (Atoms: Input, Select, Date)
│   │   ├── 02-view-protocol.md (Collections: Grid, Kanban, Gantt)
│   │   ├── 03-layout-system.md (Containers: Master-Detail, Dashboard)
│   │   ├── 04-action-triggers.md (Interactivity Protocol)
│   │   └── 05-report-template.md (PDF Generation & Print)
│   │
│   └── 03-objectos/ (Runtime Protocol)
│       ├── 00-overview.md (The Kernel Metaphor)
│       ├── 01-workflow-engine.md (FSM, BPMN Mapping, Approval)
│       ├── 02-automation-rules.md (Triggers, Flows, Jobs)
│       ├── 03-permission-governance.md (RBAC, FLS, Sharing Rules)
│       ├── 04-audit-compliance.md (Audit Logs & History Tracking)
│       ├── 05-integration-etl.md (Virtual Objects & Data Mapping)
│       └── 06-plugin-manifest.md (Packaging & Lifecycle)
│
├── 04-development/ (新增：开发者手册 - SDK与工具链)
│   ├── 01-cli-reference.md (@objectos/cli 命令详解)
│   ├── 02-sdk-reference/
│   │   ├── javascript-sdk.md (React/Node.js Client)
│   │   ├── python-sdk.md (Data Analysis & AI Agents)
│   │   └── go-sdk.md (Backend Microservices)
│   └── 03-api-reference/ (OpenAPI/GraphQL 自动生成文档)
│
└── 05-ecosystem/ (生态与扩展 - 原 03/04 合并)
    ├── 01-standard-modules/ (标准业务模型参考)
    │   ├── standard-crm.md (客户、商机、合同模型定义)
    │   ├── standard-hrm.md (组织、员工、薪资模型定义)
    │   └── standard-finance.md (发票、总账模型定义)
    │
    ├── 02-drivers-spi/ (后端扩展接口)
    │   ├── database-connectors.md (Postgres, Mongo, SQLite)
    │   └── storage-adapters.md (S3, OSS, Local)
    │
    ├── 03-renderers-spi/ (前端扩展接口)
    │   ├── react-renderer.md (Shadcn/Antd 实现参考)
    │   └── flutter-renderer.md (Mobile 实现参考)
    │
    └── 04-compatibility-kit/ (TCK)
        └── compliance-tests.md (如何验证你的 Driver 符合协议)