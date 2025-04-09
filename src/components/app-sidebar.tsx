import { FileText, Globe2, AlertCircle, Vote, UserSearch } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Reputation System",
        url: "#",
        icon: Vote,
    },
    {
        title: "Insider Detection",
        url: "#",
        icon: UserSearch,
    },
    {
        title: "Alerts System",
        url: "#",
        icon: AlertCircle,
    },
    {
        title: "Social Media Analysis",
        url: "#",
        icon: Globe2,
    },
    {
        title: "Token Reports",
        url: "#",
        icon: FileText,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="h-[200px]"><img src="/assets/logo.png" width="100%" height="10px" /></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
