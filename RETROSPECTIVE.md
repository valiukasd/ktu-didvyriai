# RETROSPECTIVE

**Summary**
- **Scope:** Three sprints retrospective.
- **Contributors:** Deividas, Darius, Simonas, Mikalojus.

**Sprint 1**

**Good**
| Contributor | Item |
|---|---|
| Deividas | Fast project bootstrap: Next.js + TypeScript setup |
| Darius | Clear prioritization of initial user flows |
| Simonas | Quick delivery of initial UI pages and forms |
| Mikalojus | DB schema created early using Drizzle ORM |

**Bad**
| Contributor | Item |
|---|---|
| Deividas | No automated tests added — changes are risky |
| Darius | Minimal project documentation for setup and run |
| Simonas | Inconsistent component patterns across pages |
| Mikalojus | Migrations executed at import time (client.ts uses top-level `migrate`) causing surprising behavior |

**What to improve**
| Contributor | Item |
|---|---|
| Deividas | Add basic unit tests for core helpers and API handlers |
| Darius | Write short onboarding docs (how to run, dev, migrations) |
| Simonas | Agree on component primitives and naming conventions |
| Mikalojus | Move migrations to an explicit step; avoid auto-running on module import |

**Sprint 2**

**Good**
| Contributor | Item |
|---|---|
| Deividas | Introduced lint/format scripts to keep code consistent |
| Darius | Implemented core auth flows using existing libraries |
| Simonas | Improved responsive layout and some accessibility fixes |
| Mikalojus | Added more migration iterations and schema improvements |

**Bad**
| Contributor | Item |
|---|---|
| Deividas | Error handling is inconsistent across API routes |
| Darius | No CI pipeline to run checks on PRs yet |
| Simonas | Accessibility work was reactive rather than planned |
| Mikalojus | Migration ordering caused issues during a deploy attempt |

**What to improve**
| Contributor | Item |
|---|---|
| Deividas | Standardize error-handling patterns and shared utilities |
| Darius | Add CI to run lint, type-check, and (eventually) tests on PRs |
| Simonas | Add accessibility checklist to Definition of Done (DoD) |
| Mikalojus | Add migration dry-run and rollback instructions to deploy checklist |

**Sprint 3**

**Good**
| Contributor | Item |
|---|---|
| Deividas | Polished onboarding UX and form flows |
| Darius | Discussed release/rollback improvements and runbooks |
| Simonas | Visual polish reduced obvious UI bugs |
| Mikalojus | Added DB health checks and backup notes |

**Bad**
| Contributor | Item |
|---|---|
| Deividas | Race conditions and flaky behavior in some form handlers |
| Darius | Lack of tests makes regressions visible late and expensive to fix |
| Simonas | No centralized component library; repeated ad-hoc components |
| Mikalojus | Slow queries noticed but no profiling or alerting set up |

**What to improve**
| Contributor | Item |
|---|---|
| Deividas | Add tests around form flows and session handling |
| Darius | Start with a focused test suite (DB client, a couple API handlers) |
| Simonas | Extract shared UI primitives into `components/ui/` with examples |
| Mikalojus | Add basic query logging/profiling and a plan to address slow queries |

**Consolidated Action Items**
- **Process:** Add a short PR checklist (description, testing steps, reviewer); limit WIP; schedule mid-sprint integration checkpoints.
- **Quality:** Create a minimal test harness (Vitest or Jest), add an example test, enable pre-commit lint/format hooks, and add CI to run lint/type-check/tests on PRs.
- **UX/Design:** Create a small component backlog and document shared UI primitives with usage examples.
- **Technical:** Remove top-level auto-migrate from client.ts; make migrations explicit with dry-run and rollback steps; introduce lightweight profiling/alerts for slow queries.