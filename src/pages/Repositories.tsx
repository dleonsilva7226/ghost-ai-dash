import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

const repositories = [
  {
    name: "frontend-app",
    lastScan: "2 hours ago",
    issues: 23,
    status: "completed",
  },
  {
    name: "api-gateway",
    lastScan: "5 hours ago",
    issues: 47,
    status: "completed",
  },
  {
    name: "ml-pipeline",
    lastScan: "1 day ago",
    issues: 12,
    status: "completed",
  },
  {
    name: "auth-service",
    lastScan: "Just now",
    issues: 8,
    status: "scanning",
  },
  {
    name: "data-processor",
    lastScan: "3 days ago",
    issues: 34,
    status: "error",
  },
];

const Repositories = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-safe/10 text-safe border-safe text-xs font-medium">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "scanning":
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary text-xs font-medium">
            <Clock className="h-3 w-3 mr-1" />
            Scanning
          </Badge>
        );
      case "error":
        return (
          <Badge variant="outline" className="bg-critical/10 text-critical border-critical text-xs font-medium">
            <AlertCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Repositories</h1>
        <p className="text-muted-foreground">Manage and monitor repository scans</p>
      </div>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-foreground">All Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Repository Name</TableHead>
                <TableHead className="text-muted-foreground">Last Scan</TableHead>
                <TableHead className="text-muted-foreground">Issues Found</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repositories.map((repo) => (
                <TableRow key={repo.name} className="border-border">
                  <TableCell className="font-medium text-foreground">{repo.name}</TableCell>
                  <TableCell className="text-muted-foreground">{repo.lastScan}</TableCell>
                  <TableCell>
                    <span
                      className={
                        repo.issues > 30
                          ? "text-critical font-semibold"
                          : repo.issues > 15
                          ? "text-warning font-semibold"
                          : "text-safe font-semibold"
                      }
                    >
                      {repo.issues}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(repo.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Repositories;
