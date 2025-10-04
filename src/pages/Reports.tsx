import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, GitBranch } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const findings = [
  {
    id: 1,
    filePath: "src/config/database.ts",
    line: 42,
    detector: "Secret Scanner",
    severity: "high",
    createdAt: "2024-01-15",
    repo: "api-gateway",
    snippet: "const API_KEY = 'sk_live_abc123...'",
  },
  {
    id: 2,
    filePath: "src/utils/auth.ts",
    line: 128,
    detector: "PII Detector",
    severity: "medium",
    createdAt: "2024-01-15",
    repo: "frontend-app",
    snippet: "email: john.doe@company.com",
  },
  {
    id: 3,
    filePath: "src/models/prompt.py",
    line: 67,
    detector: "Prompt Injection",
    severity: "high",
    createdAt: "2024-01-14",
    repo: "ml-pipeline",
    snippet: "Ignore previous instructions...",
  },
  {
    id: 4,
    filePath: "src/api/routes.ts",
    line: 89,
    detector: "Code Risk",
    severity: "low",
    createdAt: "2024-01-14",
    repo: "api-gateway",
    snippet: "eval(userInput)",
  },
  {
    id: 5,
    filePath: "src/components/UserForm.tsx",
    line: 203,
    detector: "PII Detector",
    severity: "medium",
    createdAt: "2024-01-13",
    repo: "frontend-app",
    snippet: "SSN: 123-45-6789",
  },
];

const repoHeatmapData = [
  { repo: "api-gateway", issues: 25, color: "hsl(var(--critical))" },
  { repo: "frontend-app", issues: 18, color: "hsl(var(--warning))" },
  { repo: "ml-pipeline", issues: 15, color: "hsl(var(--warning))" },
  { repo: "backend-service", issues: 12, color: "hsl(var(--safe))" },
  { repo: "auth-service", issues: 8, color: "hsl(var(--safe))" },
];

const Reports = () => {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [detectorFilter, setDetectorFilter] = useState("all");
  const [hoveredFinding, setHoveredFinding] = useState<number | null>(null);

  const filteredFindings = findings.filter((finding) => {
    if (severityFilter !== "all" && finding.severity !== severityFilter) return false;
    if (detectorFilter !== "all" && finding.detector !== detectorFilter) return false;
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return (
          <Badge variant="outline" className="bg-critical/10 text-critical border-critical">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-safe/10 text-safe border-safe">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">All security findings and violations</p>
      </div>

      {/* Repository Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Repository Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={repoHeatmapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="repo" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "0 0 20px hsl(var(--primary) / 0.3)",
                }}
              />
              <Bar dataKey="issues" radius={[8, 8, 0, 0]}>
                {repoHeatmapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select value={detectorFilter} onValueChange={setDetectorFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by detector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Detectors</SelectItem>
            <SelectItem value="Secret Scanner">Secret Scanner</SelectItem>
            <SelectItem value="PII Detector">PII Detector</SelectItem>
            <SelectItem value="Prompt Injection">Prompt Injection</SelectItem>
            <SelectItem value="Code Risk">Code Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Findings ({filteredFindings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>File Path</TableHead>
                <TableHead>Line</TableHead>
                <TableHead>Detector</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFindings.map((finding) => (
                <TableRow 
                  key={finding.id}
                  className={`border-border/50 transition-all duration-200 ${
                    hoveredFinding === finding.id ? 'bg-primary/5' : ''
                  }`}
                  onMouseEnter={() => setHoveredFinding(finding.id)}
                  onMouseLeave={() => setHoveredFinding(null)}
                >
                  <TableCell className="font-mono text-sm">{finding.filePath}</TableCell>
                  <TableCell className="text-muted-foreground">{finding.line}</TableCell>
                  <TableCell>{finding.detector}</TableCell>
                  <TableCell>{getSeverityBadge(finding.severity)}</TableCell>
                  <TableCell className="text-muted-foreground">{finding.createdAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Hover Preview */}
          {hoveredFinding && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-primary">
              <div className="text-xs text-muted-foreground mb-1">Preview:</div>
              <code className="text-sm font-mono text-primary">
                {findings.find(f => f.id === hoveredFinding)?.snippet}
              </code>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
