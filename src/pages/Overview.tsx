import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Key, Code, TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const issueData = [
  { name: "Secrets", count: 47, icon: Key, trend: -5 },
  { name: "PII", count: 23, icon: Shield, trend: 12 },
  { name: "Prompt Injection", count: 12, icon: AlertTriangle, trend: -3 },
  { name: "Risky Code", count: 8, icon: Code, trend: 0 },
];

const severityData = [
  { name: "High", count: 34, color: "hsl(var(--critical))" },
  { name: "Medium", count: 38, color: "hsl(var(--warning))" },
  { name: "Low", count: 18, color: "hsl(var(--safe))" },
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

const sparklineData = (base: number) => [
  { value: base },
  { value: base + 5 },
  { value: base - 3 },
  { value: base + 8 },
  { value: base - 2 },
  { value: base + 4 },
  { value: base },
];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground">Security findings across all repositories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {issueData.map((issue) => (
          <Card 
            key={issue.name} 
            className="border border-border hover:border-primary/50 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{issue.name}</CardTitle>
              <issue.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-foreground">{issue.count}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {issue.trend !== 0 && (
                      <>
                        {issue.trend > 0 ? (
                          <TrendingUp className="h-3 w-3 text-critical" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-safe" />
                        )}
                        <span className={`text-xs font-medium ${issue.trend > 0 ? 'text-critical' : 'text-safe'}`}>
                          {Math.abs(issue.trend)}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-20 h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData(issue.count)}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Violations Over Time (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
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
                  dot={{ fill: "hsl(var(--primary))", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Severity Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {severityData.map((severity) => (
                <div key={severity.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: severity.color }}
                    />
                    <span className="text-foreground font-medium">{severity.name}</span>
                  </div>
                  <span className="text-foreground font-bold">{severity.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
