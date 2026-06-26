import { Briefcase, Envelope, Gear, VectorSquare, Factory, Person, Magnifier } from "@gravity-ui/icons";
import { FaWpforms, FaUser } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { IoBookSharp } from "react-icons/io5";
import { Button, Drawer } from "@heroui/react";
import { VscLayoutSidebarLeftDock } from "react-icons/vsc";
import { Bookmark, Building, CreditCard, FileText, Users } from "lucide-react";
import { getUserSession } from "@/lib/core/session";
import NavLink from "../shared/Navlink";

export async function SideBar() {

    const user = await getUserSession();

    const readerNavLinks = [
        { icon: VectorSquare, label: "Dashboard", href: "/dashboard/reader" },
        { icon: LiaMoneyBillWaveAltSolid, label: "Purchased History", href: "/dashboard/reader/purchased-history" },
        { icon: IoBookSharp, label: "Purchased Ebooks", href: "/dashboard/reader/purchased-ebooks" },
        { icon: CiBookmark, label: "Bookmarks", href: "/dashboard/reader/bookmarks" },
        { icon: FaUser, label: "Profile", href: "/dashboard/reader/profile" },
    ];

    const writerNavLinks = [
        { icon: VectorSquare, href: "/dashboard/writer", label: "Dashboard" },
        { icon: Magnifier, href: "/dashboard/writer/manage-ebook", label: "Manage Ebooks" },
        { icon: FaWpforms, href: "/dashboard/writer/add-ebook", label: "Add Ebooks" },
        { icon: CiBookmark, href: "/dashboard/writer/bookmark", label: "Bookmarks" },
        { icon: LiaMoneyBillWaveAltSolid, href: "/dashboard/writer/sales-history", label: "Sales History" },
    ];

    const adminNavLinks = [
        { icon: VectorSquare, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/manage-users", label: "Manage Users" },
        { icon: Magnifier, href: "/dashboard/admin/manage-ebooks", label: "Manage All Ebooks" },
        { icon: LiaMoneyBillWaveAltSolid, href: "/dashboard/admin/transactions", label: "View All Transactions" },
    ];

    const navLinksMap = {
        reader: readerNavLinks,
        writer: writerNavLinks,
        admin: adminNavLinks
    }

    const navItems = navLinksMap[user?.role || 'reader'];



    const navContent = <nav className="flex flex-col gap-1 w-full">
        {navItems.map((item) => (
            <NavLink key={item.label} href={item.href}>
                <button
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground w-full transition-colors hover:bg-default"
                    type="button"
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </button>
            </NavLink>
        ))}
    </nav>

    const navContentclosed = <nav className="flex flex-col gap-1 w-full">
        {navItems.map((item) => (
            <NavLink key={item.label} href={item.href}>
                <button
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-foreground w-full transition-colors hover:bg-default"
                    type="button"
                >
                    <item.icon className="size-5 text-muted" />
                </button>
            </NavLink>
        ))}
    </nav>

    return (

        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
                <div className="mt-20">
                    {navContent}
                </div>
            </aside>

            <Drawer>
                <div>
                    <Button className="lg:hidden rounded-none" variant="ghost">
                        <VscLayoutSidebarLeftDock />
                    </Button>

                    <div className="md:hidden">
                        {navContentclosed}
                    </div>
                </div>

                <div className="min-h-screen h-full lg:hidden w-px text-default bg-default"></div>

                <Drawer.Backdrop>
                    <Drawer.Content placement="left" >
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading className="font-mono tracking-wider font-semibold">Fable</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}