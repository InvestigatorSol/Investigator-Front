'use client';
import { FileText, Globe2, AlertCircle, Vote, UserSearch } from "lucide-react"
import { usePathname } from 'next/navigation'

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
        url: "/reputation",
        icon: Vote,
    },
    {
        title: "Insider Detection",
        url: "/insider",
        icon: UserSearch,
    },
    {
        title: "Alerts System",
        url: "/alerts",
        icon: AlertCircle,
    },
    {
        title: "Social Media Analysis",
        url: "/social",
        icon: Globe2,
    },
    {
        title: "Token Reports",
        url: "/reports",
        icon: FileText,
    },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="h-[200px]"><img src="/assets/logo.png" width="100%" height="10px" /></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
