"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Project {
  name: string;
  framework: string;
  frameworkIcon: string;
  status: string;
  lastDeployment: string;
}

const projects: Project[] = [
  {
    name: "John Doe",
    framework: "Pro",
    frameworkIcon: "▲",
    status: "40 $",
    lastDeployment: "2 hours ago",
  },
  {
    name: "Claw Bot",
    framework: "Enterprise",
    frameworkIcon: "▲",
    status: "99 $",
    lastDeployment: "5 hours ago",
  },
  {
    name: "Tim API",
    framework: "Pro",
    frameworkIcon: "▲",
    status: "40 $",
    lastDeployment: "1 day ago",
  },
  {
    name: "Web Site",
    framework: "Pro",
    frameworkIcon: "▲",
    status: "40 $",
    lastDeployment: "3 days ago",
  },
  {
    name: "John Smith",
    framework: "Remix",
    frameworkIcon: "▲",
    status: "40 $",
    lastDeployment: "1 week ago",
  },
];

export function ProjectsTable() {
  return (
    <Card className="p-4 shadow-none gap-4">
      <div>
        <h3 className="font-semibold text-sm">Payment history</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border/50">
            <TableHead className="text-sm font-semibold">User</TableHead>
            <TableHead className="text-sm font-semibold">Plan</TableHead>
            <TableHead className="text-sm font-semibold">Price</TableHead>
            <TableHead className="text-sm font-semibold">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.name}
              className="hover:bg-muted/50 border-border/50"
            >
              <TableCell className="font-medium text-sm text-muted-foreground">
                {project.name}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`text-xs`}>
                  <span>{project.frameworkIcon}</span>
                  {project.framework}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {project.status}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {project.lastDeployment}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
