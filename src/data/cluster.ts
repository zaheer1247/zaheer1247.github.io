import type { ClusterConfig, ClusterEvent, ClusterNode, IngressEndpoint, PortfolioPod, ProfileSection } from './types'

export const cluster: ClusterConfig = {
  name: 'zaheer-platform', environment: 'production', version: 'v1.30.2', status: 'healthy', region: 'ap-south-1',
}

// usage.pods mirrors the real number of PortfolioPod entries scheduled onto each node
// (kept in sync manually — see the pods array below).
export const nodes: ClusterNode[] = [
  { id: 'identity', name: 'node-01', role: 'Identity', status: 'healthy', labels: ['profile', 'leadership'], description: 'Professional identity and platform-engineering focus.', usage: { cpu: 22, memory: 31, pods: 4 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'engineering', name: 'node-02', role: 'Engineering', status: 'healthy', labels: ['kubernetes', 'automation'], description: 'The technical capability map — one pod per skill domain.', usage: { cpu: 54, memory: 63, pods: 7 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  {
    id: 'experience', name: 'node-03', role: 'Experience', status: 'healthy', labels: ['career', 'rollout'], description: 'Career progression from quality engineering to platform operations.', usage: { cpu: 47, memory: 38, pods: 5 }, capacity: { cpu: 100, memory: 100, pods: 12 },
    progression: { stages: ['Quality Engineering', 'Automation', 'Infrastructure', 'DevOps', 'SRE'], currentIndex: 3 },
  },
  { id: 'projects', name: 'node-04', role: 'Projects', status: 'healthy', labels: ['docker', 'kubernetes', 'terraform'], description: 'Hands-on projects across CI/CD, containers, Kubernetes, cloud infrastructure, and observability.', usage: { cpu: 58, memory: 52, pods: 7 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
  { id: 'certifications', name: 'node-05', role: 'Certifications', status: 'healthy', labels: ['red-hat', 'learning', 'in-progress'], description: 'Completed and in-progress certifications across Kubernetes, Linux, cloud, and automation.', usage: { cpu: 24, memory: 30, pods: 8 }, capacity: { cpu: 100, memory: 100, pods: 12 } },
]

export const pods: PortfolioPod[] = [
  { id: 'profile', name: 'profile-pod', namespace: 'identity', kind: 'profile', status: 'healthy', nodeId: 'identity', title: 'Zaheer Abbas', summary: 'Quality Engineer III building toward reliable cloud platforms.', technologies: ['Selenium', 'Linux', 'Kubernetes'], metadata: [{ label: 'Role', value: 'Quality Engineer III' }, { label: 'Runtime', value: '11+ years' }, { label: 'Career target', value: 'Cloud Platform Architect' }, { label: 'Operating model', value: 'DevOps / SRE' }],
    events: [
      { id: 'profile-scheduled', timestamp: '12:48:24', level: 'success', reason: 'Scheduled', resource: 'pod/profile-pod', message: 'Successfully assigned to node-01/identity.' },
      { id: 'profile-ready', timestamp: '12:48:26', level: 'success', reason: 'Ready', resource: 'pod/profile-pod', message: '11+ years of runtime, targeting Cloud Platform Architect.' },
    ] },
  { id: 'about', name: 'about-pod', namespace: 'identity', kind: 'profile', status: 'healthy', nodeId: 'identity', title: 'Core background', summary: 'A systems foundation spanning software quality, automation, and infrastructure.', technologies: ['Testing', 'Automation', 'Infrastructure'], metadata: [{ label: 'Domain', value: 'Software engineering' }, { label: 'Primary focus', value: 'Quality & automation' }, { label: 'Platform layer', value: 'Infrastructure & DevOps' }] },
  { id: 'education', name: 'education-pod', namespace: 'identity', kind: 'profile', status: 'healthy', nodeId: 'identity', title: 'Learning foundation', summary: 'Self-directed and mentor-led training across Linux, containers, and cloud platforms.', technologies: ['Linux', 'Cloud', 'Kubernetes'], metadata: [{ label: 'Learning mode', value: 'Continuous' }, { label: 'Current track', value: 'Cloud-native platforms' }, { label: 'Validation', value: 'Hands-on delivery' }] },
  { id: 'career', name: 'career-pod', namespace: 'identity', kind: 'role', status: 'healthy', nodeId: 'identity', title: 'Career trajectory', summary: 'A deliberate path from quality systems to cloud platform architecture.', technologies: ['DevOps', 'SRE', 'Cloud'], metadata: [{ label: 'Origin', value: 'Software testing' }, { label: 'Progression', value: 'Automation → Infrastructure → Kubernetes' }, { label: 'Destination', value: 'Cloud Platform Architect' }],
    events: [
      { id: 'career-origin', timestamp: '12:47:40', level: 'normal', reason: 'RevisionCreated', resource: 'rollout/career', message: 'rev. 1 · origin — Quality Engineering.' },
      { id: 'career-active', timestamp: '12:48:02', level: 'success', reason: 'RevisionActive', resource: 'rollout/career', message: 'rev. 8 · active — DevOps / SRE.' },
    ] },

  // ---- node-02 / Engineering — one pod per technical capability. Each pod's `capabilities`
  // renders as a grouped tile grid (Kubernetes API-group-style labels) rather than a flat
  // technology list. `technologies` stays as a short 2-3 item highlight row for the compact
  // node-card view. kubernetes-pod/linux-pod/observability-pod concept lists come directly
  // from Zaheer's brief; cloud-pod and automation-pod are grounded in verified training/work
  // history (old master branch); ansible-pod/terraform-pod use standard, well-known concept
  // areas for those tools (not personal achievement claims).
  {
    id: 'linux-pod', name: 'linux-pod', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering',
    title: 'Linux', summary: 'Operating-system fundamentals across Red Hat Enterprise Linux — administration, infrastructure, and access control.',
    technologies: ['RHEL', 'SELinux', 'Networking'],
    capabilities: [
      { apiGroup: 'system/v1', items: ['RHEL', 'System Administration', 'Processes'] },
      { apiGroup: 'infrastructure/v1', items: ['Networking', 'Storage'] },
      { apiGroup: 'security/v1', items: ['Users', 'Permissions', 'SELinux'] },
    ],
  },
  {
    id: 'ansible-pod', name: 'ansible-pod', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering',
    title: 'Ansible', summary: 'Configuration management and automation concepts from the Red Hat Ansible (RH294) training track.',
    technologies: ['Playbooks', 'Roles', 'RH294'],
    capabilities: [
      { apiGroup: 'automation/v1', items: ['Playbooks', 'Roles', 'Ad-hoc Commands'] },
      { apiGroup: 'config/v1', items: ['Inventory', 'Templates'] },
      { apiGroup: 'ops/v1', items: ['Idempotency', 'Ansible Vault'] },
    ],
  },
  {
    id: 'kubernetes-pod', name: 'kubernetes-pod', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering',
    title: 'Kubernetes', summary: 'Kubernetes fundamentals across workloads, networking, configuration, security, and day-2 operations.',
    technologies: ['Pods', 'Deployments', 'Helm'],
    capabilities: [
      { apiGroup: 'workloads/v1', items: ['Pods', 'Deployments'] },
      { apiGroup: 'networking.k8s.io/v1', items: ['Services', 'Ingress'] },
      { apiGroup: 'core/v1', items: ['ConfigMaps', 'Secrets'] },
      { apiGroup: 'rbac.authorization.k8s.io/v1', items: ['RBAC'] },
      { apiGroup: 'helm.sh/v3', items: ['Helm'] },
      { apiGroup: 'ops/v1', items: ['Cluster Administration', 'Troubleshooting'] },
    ],
  },
  {
    id: 'terraform-pod', name: 'terraform-pod', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering',
    title: 'Terraform', summary: 'Infrastructure-as-code concepts — provider configuration, module structure, and state lifecycle.',
    technologies: ['Providers', 'Modules', 'State'],
    capabilities: [
      { apiGroup: 'config/v1', items: ['Providers', 'Resources', 'Variables'] },
      { apiGroup: 'structure/v1', items: ['Modules', 'Workspaces'] },
      { apiGroup: 'lifecycle/v1', items: ['Plan & Apply', 'State Management', 'Remote Backends'] },
    ],
  },
  {
    id: 'cloud-pod', name: 'cloud-pod', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering',
    title: 'Cloud', summary: 'Cloud platform training across AWS (IAM, Lambda, API Gateway, Serverless Framework) and Microsoft Azure, including AKS.',
    technologies: ['AWS', 'Azure', 'IAM'],
    capabilities: [
      { apiGroup: 'aws/v1', items: ['IAM', 'Lambda', 'API Gateway', 'Serverless Framework'] },
      { apiGroup: 'azure/v1', items: ['Microsoft Azure', 'Azure AKS'] },
    ],
  },
  {
    id: 'automation-pod', name: 'automation-pod', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering',
    title: 'Automation', summary: 'Test automation and delivery-pipeline tooling — from automated test suites to CI/CD.',
    technologies: ['Selenium', 'GitHub Actions', 'Jenkins'],
    capabilities: [
      { apiGroup: 'testing/v1', items: ['Selenium', 'API Testing', 'Python'] },
      { apiGroup: 'delivery/v1', items: ['GitHub Actions', 'Jenkins', 'Git'] },
    ],
  },
  {
    id: 'observability-pod', name: 'observability-pod', namespace: 'skills', kind: 'skill', status: 'healthy', nodeId: 'engineering',
    title: 'Observability', summary: 'Monitoring and observability concepts — metrics collection, visualization, and alerting.',
    technologies: ['Prometheus', 'Grafana', 'Alerting'],
    capabilities: [
      { apiGroup: 'metrics/v1', items: ['Prometheus', 'Node Exporter', 'Metrics'] },
      { apiGroup: 'insights/v1', items: ['Grafana', 'Monitoring', 'Alerting'] },
    ],
  },

  // ---- node-03 / Experience — career history modeled as workloads, inspected like
  // `kubectl describe pod`. Every Role/Responsibilities/Technologies/Key-achievement value
  // below comes from the old master-branch site's Work Experience / Achievements sections
  // (Code IT India → CCUBE → RealPage, Inc.), cross-checked against the live site — nothing
  // invented. `career-rollout` (below) remains the single-pod summary of the full 9-stage
  // arc; these four are the detailed, per-stage "workloads" behind it.
  {
    id: 'quality-engineering-pod', name: 'quality-engineering-pod', namespace: 'experience', kind: 'role', status: 'healthy', nodeId: 'experience',
    title: 'Quality Engineering', summary: 'Where the career started — owning end-to-end testing of web applications.',
    technologies: ['Software Testing', 'Web Applications'],
    metadata: [{ label: 'Role', value: 'Test Engineer → Quality Engineer II → III' }, { label: 'Companies', value: 'Code IT India, RealPage, Inc.' }, { label: 'Progression', value: 'Origin → Automation' }],
    details: [
      { label: 'Responsibilities', items: ['Began a software testing career at Code IT India (2015).', 'Own end-to-end testing of RealPage web applications for functionality and reliability across multiple release cycles.'] },
      { label: 'Key achievements', items: ['Promoted from Quality Engineer II to Quality Engineer III at RealPage, Inc.'] },
    ],
    events: [
      { id: 'qe-started', timestamp: '12:40:00', level: 'normal', reason: 'Started', resource: 'role/quality-engineering', message: 'Software testing career began at Code IT India (2015).' },
      { id: 'qe-promoted', timestamp: '12:44:12', level: 'success', reason: 'Promoted', resource: 'role/quality-engineering', message: 'Promoted to Quality Engineer III at RealPage, Inc.' },
    ],
  },
  {
    id: 'automation-role-pod', name: 'automation-pod', namespace: 'experience', kind: 'role', status: 'healthy', nodeId: 'experience',
    title: 'Automation', summary: 'Building and maintaining automated test suites as a Senior Test Automation Engineer.',
    technologies: ['TestNG', 'Cucumber', 'Maven', 'JMeter'],
    metadata: [{ label: 'Role', value: 'Senior Test Automation Engineer' }, { label: 'Company', value: 'CCUBE · Gachibowli, Hyderabad' }, { label: 'Progression', value: 'Quality Engineering → Infrastructure' }],
    details: [
      { label: 'Responsibilities', items: ['Built and maintained automated test suites for web applications using TestNG and the BDD/Cucumber framework.', 'Used Maven for build management and JMeter for performance testing.', 'Validated data with basic SQL queries as part of test coverage.', 'Gained working exposure to Docker, TeamCity and Jenkins as part of the automation and delivery pipeline.'] },
    ],
    events: [
      { id: 'automation-role-started', timestamp: '12:44:30', level: 'normal', reason: 'Started', resource: 'role/automation', message: 'Senior Test Automation Engineer at CCUBE, Gachibowli, Hyderabad.' },
      { id: 'automation-role-exposure', timestamp: '12:45:10', level: 'normal', reason: 'ExposureGained', resource: 'role/automation', message: 'Working exposure to Docker, TeamCity and Jenkins.' },
    ],
  },
  {
    id: 'infrastructure-pod', name: 'infrastructure-pod', namespace: 'experience', kind: 'role', status: 'healthy', nodeId: 'experience',
    title: 'Infrastructure', summary: 'Self-directed, mentorship-led training expanding into containers, platforms, and cloud.',
    technologies: ['Docker', 'OpenShift', 'Ansible', 'AWS', 'Azure'],
    metadata: [{ label: 'Role', value: 'Self-directed training (alongside full-time QA role)' }, { label: 'Mentor', value: 'Mr. Vimal Daga · LinuxWorld / IIEC' }, { label: 'Progression', value: 'Automation → DevOps' }],
    details: [
      { label: 'Responsibilities', items: ['Completed structured, mentorship-led training in Ansible (RH294), OpenShift (DO101, DO280, DO425), Docker, Kubernetes fundamentals, AWS, and Microsoft Azure.', 'Wrote up learning as public LinkedIn articles.'] },
      { label: 'Key achievements', items: ['Earned the "Expertise in Docker" certification (IIEC).', 'Published OpenShift training articles on LinkedIn Pulse.'] },
    ],
    events: [
      { id: 'infra-training', timestamp: '12:45:40', level: 'normal', reason: 'TrainingCompleted', resource: 'role/infrastructure', message: 'Ansible (RH294), OpenShift (DO101, DO280, DO425) tracks completed under mentorship.' },
      { id: 'infra-cert', timestamp: '12:46:20', level: 'success', reason: 'CertificationEarned', resource: 'role/infrastructure', message: 'Earned the "Expertise in Docker" certification (IIEC).' },
    ],
  },
  {
    id: 'devops-transition-pod', name: 'devops-transition-pod', namespace: 'experience', kind: 'role', status: 'pending', nodeId: 'experience',
    title: 'DevOps Transition', summary: 'The current, active stage — bringing DevOps and cloud-native practices into day-to-day QA work.',
    technologies: ['Docker', 'OpenShift', 'Ansible'],
    metadata: [{ label: 'Role', value: 'Quality Engineer III (current)' }, { label: 'Company', value: 'RealPage, Inc.' }, { label: 'Progression', value: 'Infrastructure → SRE (in progress)' }],
    details: [
      { label: 'Responsibilities', items: ['Continuing to bring DevOps and cloud-native practices — Docker, OpenShift, Ansible — into the QA workflow.', 'Preparing for the Red Hat Certified Specialist in OpenShift Administration (EX280) exam.'] },
    ],
    events: [
      { id: 'devops-transition-active', timestamp: '12:46:50', level: 'normal', reason: 'RolloutInProgress', resource: 'role/devops-transition', message: 'Infrastructure → SRE rollout in progress.' },
      { id: 'devops-transition-prep', timestamp: '12:47:15', level: 'normal', reason: 'ExamPrep', resource: 'role/devops-transition', message: 'Preparing for the Red Hat EX280 exam.' },
    ],
  },

  // Deployment history of the platform-engineer role itself, modeled as a rollout still in
  // progress toward its desired revision. Stages come directly from the career direction
  // Zaheer provided; status is intentionally "pending" (RolloutInProgress) rather than
  // "healthy" because the destination revision (Cloud Platform Architect) has not been
  // reached yet — see profile-pod's "Career target" field.
  {
    id: 'rollout', name: 'career-rollout', namespace: 'experience', kind: 'timeline', status: 'pending', nodeId: 'experience',
    title: 'Career rollout', summary: 'Deployment history of the platform-engineer role — a rollout still progressing toward its desired revision.',
    technologies: ['DevOps', 'SRE', 'Cloud'],
    metadata: [
      { label: 'rev. 1 · origin', value: 'Quality Engineering' },
      { label: 'rev. 2', value: 'Test Automation' },
      { label: 'rev. 3', value: 'Linux' },
      { label: 'rev. 4', value: 'CI/CD' },
      { label: 'rev. 5', value: 'Infrastructure' },
      { label: 'rev. 6', value: 'Kubernetes' },
      { label: 'rev. 7', value: 'Cloud' },
      { label: 'rev. 8 · active', value: 'DevOps / SRE' },
      { label: 'rev. 9 · desired', value: 'Cloud Platform Architect' },
    ],
    events: [
      { id: 'rollout-rev8', timestamp: '12:47:50', level: 'success', reason: 'RolloutProgressing', resource: 'rollout/career', message: 'rev. 8 · active — DevOps / SRE.' },
      { id: 'rollout-desired', timestamp: '12:48:00', level: 'normal', reason: 'RolloutPending', resource: 'rollout/career', message: 'rev. 9 · desired — Cloud Platform Architect not yet reached.' },
    ],
  },

  // ---- node-04 / Projects — deployed workloads. `architecture` renders as a small
  // connected-stage diagram; `details` carries the real Problem/Solution/Challenges/Results
  // case-study text from the old master-branch site's project write-ups (nothing invented —
  // these are honest, generic descriptions of what was actually built, not a literal
  // production microservice stack).
  {
    id: 'docker-compose-infra', name: 'docker-compose-infra', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects',
    title: 'Docker Compose Infrastructure Project', summary: 'A multi-container application setup built to prove out Docker fundamentals — registries, storage, networking and image entry points.',
    technologies: ['Docker', 'Docker Compose', 'Linux'],
    url: 'https://github.com/zaheer1247/IIEC_Rise_Project_Docker_Compose',
    metadata: [{ label: 'Outcome', value: 'Earned the "Expertise in Docker" certification (IIEC)' }],
    architecture: ['Docker Engine (host)', 'docker-compose.yml orchestration', 'Multi-container application', 'Shared network & volumes'],
    details: [
      { label: 'Key technical decisions', items: ['Orchestrated multiple containers with a single docker-compose.yml instead of manual "docker run" commands.', 'Applied shared networking and volume configuration across containers.'] },
      { label: 'What I learned', items: ['Came away with a practical, working understanding of container orchestration.', 'Earned the "Expertise in Docker" certification (IIEC) as a result.'] },
    ],
    events: [
      { id: 'docker-compose-deployed', timestamp: '12:41:00', level: 'success', reason: 'Deployed', resource: 'project/docker-compose-infra', message: 'Multi-container application orchestrated via docker-compose.yml.' },
      { id: 'docker-compose-cert', timestamp: '12:41:20', level: 'success', reason: 'CertificationEarned', resource: 'project/docker-compose-infra', message: 'Earned the "Expertise in Docker" certification (IIEC).' },
    ],
  },
  {
    id: 'openshift-learning-series', name: 'openshift-learning-series', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects',
    title: 'OpenShift Learning Series', summary: 'A structured, self-directed path into OpenShift administration — application building, deployment, scaling and troubleshooting.',
    technologies: ['OpenShift 4.2', 'Kubernetes', 'App Deployment'],
    url: 'https://www.linkedin.com/pulse/wonderful-journey-do280-trainingzaheer-abbas',
    metadata: [{ label: 'Outcome', value: 'Published two LinkedIn articles; foundation for the Red Hat EX280 exam' }],
    architecture: ['Developer workflow', 'OpenShift application build', 'Deployment & scaling', 'Troubleshooting & operations'],
    details: [
      { label: 'Key technical decisions', items: ['Followed the Red Hat DO101 → DO280 learning tracks under mentorship rather than ad-hoc self-study.', 'Documented the learning path as public LinkedIn articles.'] },
      { label: 'What I learned', items: ['Built the foundation now being used to prepare for the Red Hat EX280 certification exam.'] },
    ],
    events: [
      { id: 'openshift-series-published', timestamp: '12:41:40', level: 'success', reason: 'Published', resource: 'project/openshift-learning-series', message: 'Two LinkedIn articles published on the DO280 training journey.' },
    ],
  },

  // Five real, verifiable GitHub repos Zaheer provided directly. Every fact below (services,
  // tools, patterns, config) is sourced from each repo's own README — nothing invented.
  {
    id: 'flask-cicd-pipeline', name: 'flask-cicd-pipeline', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects',
    title: 'Flask App with Jenkins CI/CD', summary: 'A Dockerized Flask application with a Jenkins pipeline that builds, tests, and redeploys the app on every code change.',
    technologies: ['Flask', 'Jenkins', 'Docker', 'pytest'],
    url: 'https://github.com/zaheer1247/DevopsPrj1_Flask_Web_App_With_CI_CD',
    metadata: [{ label: 'Pipeline', value: 'Jenkins, SCM polling every 2 min' }],
    architecture: ['Git commit', 'Jenkins polls SCM', 'Docker build & push to DockerHub', 'Existing container removed', 'New container deployed', 'pytest suite run'],
    details: [
      { label: 'Key technical decisions', items: ['Jenkins polls the repository every 2 minutes rather than relying on webhooks, keeping the pipeline self-contained without extra network configuration.', 'The pipeline always removes the existing container before deploying the new image, so redeploys are idempotent instead of accumulating stale containers.'] },
      { label: 'What I learned', items: ['End-to-end pipeline design — build, push, redeploy, test — and the host-level permissions (passwordless sudo for the Jenkins user) needed for Jenkins to run Docker commands.'] },
    ],
    events: [
      { id: 'flask-cicd-build', timestamp: '12:42:00', level: 'success', reason: 'BuildTriggered', resource: 'project/flask-cicd-pipeline', message: 'Jenkins polled SCM and started a Docker build.' },
      { id: 'flask-cicd-deployed', timestamp: '12:42:15', level: 'success', reason: 'Deployed', resource: 'project/flask-cicd-pipeline', message: 'Existing container replaced; pytest suite passed.' },
    ],
  },
  {
    id: 'microservices-architecture', name: 'microservices-architecture', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects',
    title: 'Microservices Architecture with Caching', summary: 'A four-service system splitting reads and writes across dedicated Flask services, backed by PostgreSQL with a Redis cache-aside layer.',
    technologies: ['Flask', 'PostgreSQL', 'Redis', 'Docker Compose'],
    url: 'https://github.com/zaheer1247/DevopsPrj2_Microservices_Architecture',
    metadata: [{ label: 'Pattern', value: 'Cache-aside (Redis in front of PostgreSQL)' }],
    architecture: ['Client request', 'user-service (writes) / data-service (reads)', 'Redis cache (cache-aside)', 'PostgreSQL (source of truth)'],
    details: [
      { label: 'Key technical decisions', items: ['Split the system into a write-only user-service and a read-optimized data-service instead of one monolithic API, so each can be scaled independently.', 'Implemented a cache-aside pattern in the data-service: check Redis first, fall back to PostgreSQL on a miss, then populate the cache for subsequent reads.', 'Used Docker Compose service-name networking (e.g. host=postgres) instead of hardcoded IPs, with depends_on to sequence startup and a named volume to persist PostgreSQL data.'] },
      { label: 'What I learned', items: ['How cache-hit and cache-miss paths behave in practice, and why cache-aside meaningfully reduces database load for read-heavy workloads.'] },
    ],
    events: [
      { id: 'microservices-scaled', timestamp: '12:42:35', level: 'success', reason: 'ServicesReady', resource: 'project/microservices-architecture', message: 'user-service and data-service running behind Redis cache-aside.' },
    ],
  },
  {
    id: 'k8s-ai-agent', name: 'k8s-ai-agent', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects',
    title: 'Kubernetes Cluster Management AI Agent', summary: 'A LangChain agent backed by Google Gemini that translates natural-language requests into real kubectl actions against a live cluster.',
    technologies: ['Kubernetes', 'Python', 'LangChain', 'Gemini LLM'],
    url: 'https://github.com/zaheer1247/DevopsPrj3_Kubernetes_Cluster_Management',
    metadata: [{ label: 'Tools', value: 'Deploy, list pods, delete deployment, status, namespaces' }],
    architecture: ['Natural-language prompt', 'Gemini LLM (intent & parameter extraction)', 'LangChain agent selects a tool', 'kubectl / YAML applied to the cluster'],
    details: [
      { label: 'Key technical decisions', items: ["Built each cluster action (deploy, list pods, delete deployment, check status, list namespaces) as an independent Python tool function rather than one large parser, so new operations can be added without touching existing ones.", "Used LangChain's agent framework to route parsed intent to the correct tool instead of hand-writing a command dispatcher."] },
      { label: 'What I learned', items: ['How to wrap real infrastructure commands (kubectl) safely behind discrete, single-purpose functions that an LLM agent can call.'] },
    ],
    events: [
      { id: 'k8s-ai-agent-tools', timestamp: '12:42:55', level: 'success', reason: 'ToolsRegistered', resource: 'project/k8s-ai-agent', message: 'Deploy, list pods, delete deployment, status, and namespace tools registered.' },
    ],
  },
  {
    id: 'aws-terraform-infrastructure', name: 'aws-terraform-infrastructure', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects',
    title: 'AWS Infrastructure as Code with Terraform', summary: 'A complete, reproducible AWS network — VPC, multi-AZ subnets, load-balanced EC2 — provisioned from Terraform with encrypted, versioned remote state.',
    technologies: ['Terraform', 'AWS', 'VPC', 'EC2'],
    url: 'https://github.com/zaheer1247/devops-project4-aws-terraform-infrastructure-as-code',
    metadata: [{ label: 'Region', value: 'ap-south-1' }],
    architecture: ['Terraform apply', 'VPC + Internet Gateway', '2 public subnets (multi-AZ)', 'EC2 (Nginx) behind an Application Load Balancer', 'State stored in a versioned, encrypted S3 bucket'],
    details: [
      { label: 'Key technical decisions', items: ['Used an S3 backend with versioning and encryption enabled for Terraform state, instead of local state, so infrastructure changes are tracked and recoverable.', 'Split public subnets across two Availability Zones and put the EC2 instance behind an Application Load Balancer for a more resilient entry point.', 'Separated security groups for the load balancer and the EC2 instance so each only allows the traffic it actually needs.'] },
      { label: 'What I learned', items: ['How to structure a Terraform project around a remote backend and reusable variables (project name, region, CIDR blocks) so the same configuration can deploy to a different environment with a tfvars file.'] },
    ],
    events: [
      { id: 'aws-terraform-applied', timestamp: '12:43:15', level: 'success', reason: 'Applied', resource: 'project/aws-terraform-infrastructure', message: 'VPC, multi-AZ subnets, and load-balanced EC2 provisioned in ap-south-1.' },
    ],
  },
  {
    id: 'monitoring-alerting-stack', name: 'monitoring-alerting-stack', namespace: 'projects', kind: 'project', status: 'healthy', nodeId: 'projects',
    title: 'Monitoring & Alerting Stack', summary: 'A full observability stack around a Flask app — Prometheus and Grafana for metrics, the ELK stack for logs, and Alertmanager for alerting.',
    technologies: ['Prometheus', 'Grafana', 'ELK Stack', 'Alertmanager'],
    url: 'https://github.com/zaheer1247/DevopsPrj5_Monitoring_and_Alerting',
    metadata: [{ label: 'Docs', value: 'Hosted screenshot gallery via GitHub Pages' }],
    architecture: ['Flask app', 'Prometheus (metrics) → Grafana dashboards', 'Filebeat → Logstash → Elasticsearch (logs) → Kibana', 'Alertmanager (error rate, latency, uptime alerts)'],
    details: [
      { label: 'Key technical decisions', items: ['Ran metrics (Prometheus/Grafana) and logs (Filebeat → Logstash → Elasticsearch → Kibana) as two parallel pipelines feeding a shared alerting layer, rather than one combined tool.', 'Wrote Prometheus alerting rules for error rate, p95 response time, service availability, and connection count, instead of relying on dashboards alone.', 'Wrote cross-platform setup/start/stop/status scripts so the entire stack comes up with one command on Windows, Mac, or Linux.'] },
      { label: 'What I learned', items: ['Writing real PromQL — rate() and histogram_quantile() for p95 latency — and correlating metrics with logs while troubleshooting.', 'How dashboards and alerts respond under load, verified by load-testing the app with `hey`.'] },
    ],
    events: [
      { id: 'monitoring-stack-up', timestamp: '12:43:35', level: 'success', reason: 'StackReady', resource: 'project/monitoring-alerting-stack', message: 'Prometheus/Grafana and ELK pipelines running behind Alertmanager.' },
    ],
  },

  // Replaces the earlier unverified "Kubernetes Certification" / "Cloud Certification"
  // placeholders (no CKA or AWS/Azure/GCP credential exists anywhere in the repo or the
  // live site). These four reflect the real, verifiable Red Hat / IIEC training and
  // certifications from the old master-branch site.
  { id: 'docker-certification', name: 'docker-certification', namespace: 'certifications', kind: 'certification', status: 'healthy', nodeId: 'certifications', title: '"Expertise in Docker"', summary: 'Practical, applied Docker certification issued by IIEC.', technologies: ['Docker'], metadata: [{ label: 'Issuer', value: 'IIEC' }],
    events: [{ id: 'docker-cert-issued', timestamp: '12:44:00', level: 'success', reason: 'CertificationIssued', resource: 'certification/docker', message: '"Expertise in Docker" issued by IIEC.' }] },
  { id: 'openshift-training', name: 'openshift-training', namespace: 'certifications', kind: 'certification', status: 'healthy', nodeId: 'certifications', title: 'OpenShift Administration & Security', summary: 'Red Hat training tracks covering OpenShift administration and container security.', technologies: ['OpenShift', 'Container Security'], metadata: [{ label: 'Issuer', value: 'Red Hat' }, { label: 'Tracks', value: 'DO280, DO425' }],
    events: [{ id: 'openshift-training-completed', timestamp: '12:44:10', level: 'success', reason: 'TrackCompleted', resource: 'certification/openshift-training', message: 'DO280 and DO425 tracks completed.' }] },
  { id: 'ansible-training', name: 'ansible-training', namespace: 'certifications', kind: 'certification', status: 'healthy', nodeId: 'certifications', title: 'DevOps Automation — Ansible', summary: 'Red Hat official training track for automation with Ansible.', technologies: ['Ansible'], metadata: [{ label: 'Issuer', value: 'Red Hat' }, { label: 'Track', value: 'RH294' }],
    events: [{ id: 'ansible-training-completed', timestamp: '12:44:20', level: 'success', reason: 'TrackCompleted', resource: 'certification/ansible-training', message: 'RH294 track completed.' }] },
  { id: 'openshift-exam-prep', name: 'openshift-exam-prep', namespace: 'certifications', kind: 'certification', status: 'pending', statusLabel: 'Provisioning', nodeId: 'certifications', title: 'OpenShift Administration Specialist', summary: 'Currently preparing for the Red Hat Certified Specialist in OpenShift Administration exam.', technologies: ['OpenShift'], metadata: [{ label: 'Issuer', value: 'Red Hat' }, { label: 'Exam', value: 'EX280' }],
    events: [{ id: 'openshift-exam-prep-active', timestamp: '12:44:30', level: 'normal', reason: 'Provisioning', resource: 'certification/openshift-exam-prep', message: 'Preparing for the Red Hat EX280 exam.' }] },

  // Certifications currently being pursued, confirmed directly by Zaheer — modeled as
  // Provisioning rather than Running so the cluster never claims a credential that hasn't
  // actually been earned yet. No exam dates or completion percentages are invented here;
  // the provisioning-bar visual (see PodDetail) is intentionally indeterminate.
  { id: 'cka-pod', name: 'cka-pod', namespace: 'certifications', kind: 'certification', status: 'pending', statusLabel: 'Provisioning', nodeId: 'certifications', title: 'Certified Kubernetes Administrator (CKA)', summary: 'In progress — validating Kubernetes fundamentals with a vendor-neutral administration credential.', technologies: ['Kubernetes'], metadata: [{ label: 'Issuer', value: 'CNCF / The Linux Foundation' }, { label: 'Focus', value: 'Cluster admin, networking, troubleshooting' }],
    events: [{ id: 'cka-provisioning', timestamp: '12:44:40', level: 'normal', reason: 'Provisioning', resource: 'certification/cka', message: 'Studying cluster administration, networking, and troubleshooting.' }] },
  { id: 'rhcsa-rhce-pod', name: 'rhcsa-rhce-pod', namespace: 'certifications', kind: 'certification', status: 'pending', statusLabel: 'Provisioning', nodeId: 'certifications', title: 'RHCSA / RHCE', summary: 'In progress — formalizing Linux system administration and Ansible automation into the Red Hat certification track.', technologies: ['RHEL', 'Ansible'], metadata: [{ label: 'Issuer', value: 'Red Hat' }, { label: 'Exams', value: 'EX200 / EX294' }],
    events: [{ id: 'rhcsa-rhce-provisioning', timestamp: '12:44:50', level: 'normal', reason: 'Provisioning', resource: 'certification/rhcsa-rhce', message: 'Preparing for the EX200 and EX294 exams.' }] },
  { id: 'terraform-cert-pod', name: 'terraform-cert-pod', namespace: 'certifications', kind: 'certification', status: 'pending', statusLabel: 'Provisioning', nodeId: 'certifications', title: 'HashiCorp Certified: Terraform Associate', summary: 'In progress — validating infrastructure-as-code practice with a formal Terraform credential.', technologies: ['Terraform'], metadata: [{ label: 'Issuer', value: 'HashiCorp' }, { label: 'Focus', value: 'IaC provisioning & state management' }],
    events: [{ id: 'terraform-cert-provisioning', timestamp: '12:45:00', level: 'normal', reason: 'Provisioning', resource: 'certification/terraform', message: 'Studying IaC provisioning and state management practices.' }] },
  { id: 'aws-sa-pod', name: 'aws-sa-pod', namespace: 'certifications', kind: 'certification', status: 'pending', statusLabel: 'Provisioning', nodeId: 'certifications', title: 'AWS Certified Solutions Architect – Associate', summary: 'In progress — formalizing cloud architecture fundamentals alongside hands-on AWS work.', technologies: ['AWS'], metadata: [{ label: 'Issuer', value: 'Amazon Web Services' }, { label: 'Focus', value: 'Cloud architecture & design' }],
    events: [{ id: 'aws-sa-provisioning', timestamp: '12:45:10', level: 'normal', reason: 'Provisioning', resource: 'certification/aws-sa', message: 'Studying cloud architecture and design fundamentals.' }] },
]

// Cluster-scoped baseline events shown in the "Node activity" sidebar for every node
// selection. Kept deliberately generic (cluster/node-level, not tied to a specific pod
// name) so nothing here can go stale if pods are renamed or restructured — the one
// pod-specific "Scheduled" event in that sidebar is generated in App.tsx from the
// currently selected node's real, current pod list instead of a hardcoded name (the
// same "derive from real data" pattern bootWorkloadTotal uses in bootSequence.ts).
export const events: ClusterEvent[] = [
  { id: 'event-1', timestamp: '12:48:32', level: 'success', reason: 'ClusterReady', resource: 'cluster/zaheer-platform', message: 'All platform services are healthy.' },
  { id: 'event-4', timestamp: '12:48:08', level: 'success', reason: 'NodeReady', resource: 'node/workload-sre-01', message: 'Node transitioned to Ready.' },
]

export const profileSections: ProfileSection[] = [
  { id: 'profile', label: 'Profile', title: 'Platform-minded engineering', summary: 'The operating model and professional overview.', namespace: 'profile' },
  { id: 'skills', label: 'Capabilities', title: 'Systems and tools', summary: 'Technical capabilities grouped as platform workloads.', namespace: 'skills' },
  { id: 'experience', label: 'Experience', title: 'Deployment history', summary: 'Career milestones and role progression.', namespace: 'experience' },
  { id: 'projects', label: 'Projects', title: 'Workloads', summary: 'Selected platform and automation projects.', namespace: 'projects' },
  { id: 'certifications', label: 'Certifications', title: 'Training & credentials', summary: 'Completed and in-progress certifications.', namespace: 'certifications' },
]

// Ingress rules routing external traffic out of the cluster to real profiles — the
// production-ready "how to reach me" surface, modeled as Kubernetes Ingress -> Service
// routing rather than a conventional contact form.
export const externalAccess: IngressEndpoint[] = [
  { id: 'github', host: 'github.com', service: 'github-profile-svc', description: 'Source code and project history.', url: 'https://github.com/zaheer1247', status: 'healthy' },
  { id: 'linkedin', host: 'linkedin.com', service: 'linkedin-profile-svc', description: 'Professional network and experience.', url: 'https://www.linkedin.com/in/zaheer1247', status: 'healthy' },
  { id: 'email', host: 'mailto', service: 'contact-svc', description: 'Direct message.', url: 'mailto:zaheer1247@gmail.com', status: 'healthy' },
]
