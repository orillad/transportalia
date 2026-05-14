import { Link, useLocation } from "react-router";
import {
  FileText,
  Link as LinkIcon,
  Truck,
  UserRoundX,
  Users,
} from "lucide-react";
import imgLogoGran from "../../assets/logos/image.png";
import imgLogoPetit from "../../assets/logos/logo_petit.svg";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar";

const menuItems = [
  { path: "/transports-avui", label: "Transports avui", icon: FileText },
  {
    path: "/assignacions",
    label: "Assignacions",
    icon: LinkIcon,
    activePaths: ["/assignacions", "/desassignacions"],
  },
  { path: "/transports", label: "Transports", icon: Truck },
  { path: "/desbloqueig", label: "Desbloqueig", icon: UserRoundX },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <ShadcnSidebar collapsible="icon" className="border-r">
      <SidebarHeader className="bg-white px-4 py-5 group-data-[collapsible=icon]:px-2">
        <Link
          to="/transports-avui"
          className="flex justify-center md:justify-start group-data-[collapsible=icon]:justify-center"
        >
          <img
            src={imgLogoGran}
            alt="TRANSPORTALIA"
            className="h-10 w-auto object-contain group-data-[collapsible=icon]:hidden"
          />
          <img
            src={imgLogoPetit}
            alt="Transportalia"
            className="hidden h-10 w-10 object-contain group-data-[collapsible=icon]:block"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = (item.activePaths ?? [item.path]).includes(
                  location.pathname,
                );

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="mx-2 text-gray-700 data-[active=true]:bg-transparent data-[active=true]:font-bold data-[active=true]:text-[#133e6f] group-data-[collapsible=icon]:mx-0"
                    >
                      <Link to={item.path}>
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </ShadcnSidebar>
  );
}

export { SidebarInset, SidebarProvider, SidebarTrigger };
