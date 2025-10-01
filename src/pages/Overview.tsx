import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Key, Code } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const issueData = [
  { name: "Secrets", count: 47, icon: Key, color: "critical" },
  { name: "PII", count: 23, icon: Shield, color: "warning" },
  { name: "Prompt Injection", count: 12, icon: AlertTriangle, color: "warning" },
  { name: "Risky Code", count: 8, icon: Code, color: "safe" },
];

const severityData = [
  { name: "High", count: 34, color: "critical" },
  { name: "Medium", count: 38, color: "warning" },
  { name: "Low", count: 18, color: "safe" },
];

const timelineData = [
  { date: "Day 1", violations: 45 },
  { date: "Day 5", violations: 52 },
  { date: "Day 10", violations: 48 },
  { date: "Day 15", violations: 63 },
  { date: "Day 20", violations: 71 },
  { date: "Day 25", violations: 68 },
  { date: "Day 30", violations: 90 },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Overview</h1>
        <p className="text-muted-foreground">Security findings across all repositories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {issueData.map((issue) => (
          <Card key={issue.name} className="border border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{issue.name}</CardTitle>
              <issue.icon className={`h-4 w-4 text-${issue.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{issue.count}</div>
              <p className="text-xs text-muted-foreground mt-1">Active findings</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Violations Over Time (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="violations"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Severity Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {severityData.map((severity) => (
              <div key={severity.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{severity.name}</span>
                  <span className="text-sm font-bold">{severity.count}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${severity.color}`}
                    style={{
                      width: `${(severity.count / 90) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
