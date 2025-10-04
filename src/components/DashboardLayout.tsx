import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  GitBranch,
  Shield,
  FileText,
  Settings,
  Ghost,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Repositories", url: "/repositories", icon: GitBranch },
  { title: "Rules", url: "/rules", icon: Shield },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isRuntimeMode, setIsRuntimeMode] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <div className="px-6 py-4 border-b border-sidebar-border">
              <div className="flex items-center gap-2 mb-2">
                <Ghost className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-sidebar-foreground">GhostAI</h1>
              </div>
              <p className="text-xs text-muted-foreground">Security Dashboard</p>
            </div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end
                          className={({ isActive }) =>
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "hover:bg-sidebar-accent/50"
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="px-6 py-4 mt-4 border-t border-sidebar-border">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="mode-toggle" className="text-xs text-muted-foreground cursor-pointer">
                  {isRuntimeMode ? "Runtime" : "CI/CD"}
                </Label>
                <Switch
                  id="mode-toggle"
                  checked={isRuntimeMode}
                  onCheckedChange={setIsRuntimeMode}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                {isRuntimeMode ? "Real-time monitoring active" : "Build-time scanning active"}
              </p>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </SidebarProvider>
  );
}
