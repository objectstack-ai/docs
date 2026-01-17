/ (Root)
├── index.md
│
├── 01-concepts/ (序厅：企业级架构哲学)
│   ├── 01-introduction.md
│   ├── 02-core-values.md (Local-First, Protocol-Driven)
│   ├── 03-architecture.md
│   ├── 04-enterprise-patterns.md (新增：如何用协议描述 ERP/CRM 复杂业务)
│   └── 05-terminology.md
│
├── 02-specifications/ (正厅：核心协议规范)
│   │
│   ├── 01-objectql/ (数据与分析引擎协议)
│   │   ├── 00-overview.md
│   │   ├── 01-schema-definition.md (基础建模：对象、字段、关系)
│   │   ├── 02-advanced-types.md (企业级类型：Currency, Formula, Summary, Lookup)
│   │   ├── 03-ast-structure.md (核心 AST)
│   │   ├── 04-analytics-protocol.md (新增：聚合查询、透视表与 BI 数据源定义)
│   │   ├── 05-transaction-model.md (新增：跨对象事务与原子操作规范)
│   │   └── 06-wire-protocol.md
│   │
│   ├── 02-objectui/ (界面与交互引擎协议)
│   │   ├── 00-overview.md
│   │   ├── 01-component-schema.md (基础组件：Input, Select, DatePicker)
│   │   ├── 02-view-protocol.md (新增：复杂视图标准 - Grid, Kanban, Gantt, Calendar)
│   │   ├── 03-layout-system.md (布局：Master-Detail, Tab, Wizard, Dashboard)
│   │   ├── 04-action-triggers.md (交互：按钮点击后的 Client-side Logic)
│   │   └── 05-report-template.md (新增：打印模板与 PDF 生成协议)
│   │
│   └── 03-objectos/ (业务编排与治理协议)
│       ├── 00-overview.md
│       ├── 01-workflow-engine.md (新增：状态机、审批流与 BPMN 映射协议)
│       ├── 02-automation-rules.md (新增：后端触发器与自动化脚本协议)
│       ├── 03-permission-governance.md (升级：RBAC, 字段级安全, 记录级共享规则)
│       ├── 04-audit-compliance.md (新增：审计日志结构与数据变更追踪)
│       ├── 05-integration-etl.md (新增：数据导入导出与外部 API 映射标准)
│       └── 06-plugin-manifest.md
│
├── 03-compliance/ (兼容性与扩展接口)
│   ├── 01-driver-spi/
│   │   ├── db-connector.md
│   │   └── analytics-adapter.md (新增：如何对接 ClickHouse/Elasticsearch 做分析)
│   ├── 02-renderer-spi/
│   │   ├── component-mapping.md
│   │   └── view-adapter.md (新增：如何实现甘特图、日历等复杂视图)
│   └── 03-tck/
│
└── 04-implementations/ (生态索引)
    ├── official-sdks.md
    ├── business-modules/ (新增：标准业务模块参考)
    │   ├── standard-hrm (HRM 模型参考)
    │   └── standard-crm (CRM 模型参考)
    └── community-drivers.md