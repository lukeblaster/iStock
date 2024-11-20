import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"

// export default function Layout({ children }: { children: React.ReactNode }) {

export default function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full p-6 max-h-screen">
                <SidebarTrigger />
                <div className="px-2 py-6 w-full h-full">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}