import "@/styles/globals.css";
import type { Metadata } from "next";
import { SidebarLayout, Navbar, Avatar, NavbarSpacer, NavbarSection, NavbarItem } from "@/components/catalyst-ui";
import { Inter } from "next/font/google";
import { DropdownButton, DropdownDivider, DropdownLabel } from "@/components/catalyst-ui/dropdown";
import { DropdownItem } from "@/components/catalyst-ui/dropdown";
import { DropdownMenu } from "@/components/catalyst-ui/dropdown";
import { Dropdown } from "@/components/catalyst-ui/dropdown";
import { Sidebar, SidebarFooter, SidebarHeading } from "@/components/catalyst-ui/sidebar";
import { SidebarHeader } from "@/components/catalyst-ui/sidebar";
import { SidebarBody } from "@/components/catalyst-ui/sidebar";
import { SidebarSection } from "@/components/catalyst-ui/sidebar";
import { SidebarItem } from "@/components/catalyst-ui/sidebar";
import { SidebarLabel } from "@/components/catalyst-ui/sidebar";
import { SidebarSpacer } from "@/components/catalyst-ui/sidebar";
import { QueryProvider } from "@/providers/query-provider";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  InboxIcon,
  MagnifyingGlassIcon,
  UserIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  ArrowRightStartOnRectangleIcon,
  QuestionMarkCircleIcon,
  Cog8ToothIcon,
  TruckIcon,
  Square3Stack3DIcon,
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ReceiptPercentIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Watson Steel Suppliers - Cloudforge",
  description: "Watson Steel Suppliers - Cloudforge",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <SidebarLayout
              navbar={
                <Navbar>
                  <NavbarSpacer />
                  <NavbarSection>
                    <NavbarItem href="/search" aria-label="Search">
                      <MagnifyingGlassIcon />
                    </NavbarItem>
                    <NavbarItem href="/inbox" aria-label="Inbox">
                      <InboxIcon />
                    </NavbarItem>
                    <Dropdown>
                      <DropdownButton as={NavbarItem}>
                        <Avatar src="/profile-photo.jpg" square />
                      </DropdownButton>
                      <DropdownMenu className="min-w-64" anchor="bottom end">
                        <DropdownItem href="/my-profile">
                          <UserIcon />
                          <DropdownLabel>My profile</DropdownLabel>
                        </DropdownItem>
                        <DropdownItem href="/settings">
                          <Cog8ToothIcon />
                          <DropdownLabel>Settings</DropdownLabel>
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="/privacy-policy">
                          <ShieldCheckIcon />
                          <DropdownLabel>Privacy policy</DropdownLabel>
                        </DropdownItem>
                        <DropdownItem href="/share-feedback">
                          <LightBulbIcon />
                          <DropdownLabel>Share feedback</DropdownLabel>
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="/logout">
                          <ArrowRightStartOnRectangleIcon />
                          <DropdownLabel>Sign out</DropdownLabel>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavbarSection>
                </Navbar>
              }
              sidebar={
                <Sidebar>
                  <SidebarHeader>
                    <Dropdown>
                      <DropdownButton as={SidebarItem} className="lg:mb-2.5">
                        <Avatar src="/logo.png" />
                        <SidebarLabel>Watson Steel Suppliers East</SidebarLabel>
                        <ChevronDownIcon />
                      </DropdownButton>
                      <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                        <DropdownItem href="/teams/1/settings">
                          <Cog8ToothIcon />
                          <DropdownLabel>Settings</DropdownLabel>
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="/teams/1">
                          <Avatar slot="icon" src="/logo.png" />
                          <DropdownLabel>Watson Steel Suppliers - West</DropdownLabel>
                        </DropdownItem>
                        <DropdownItem href="/teams/2">
                          <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white" />
                          <DropdownLabel>Watson Steel Suppliers - East</DropdownLabel>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <SidebarSection className="max-lg:hidden">
                      <SidebarItem href="/search">
                        <MagnifyingGlassIcon />
                        <SidebarLabel>Search</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/inbox">
                        <InboxIcon />
                        <SidebarLabel>Inbox</SidebarLabel>
                      </SidebarItem>
                    </SidebarSection>
                  </SidebarHeader>
                  <SidebarBody>
                    <SidebarSection>
                      <SidebarItem href="/">
                        <HomeIcon />
                        <SidebarLabel>Dashboard</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/customers">
                        <UserGroupIcon />
                        <SidebarLabel>Customers</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/suppliers">
                        <TruckIcon />
                        <SidebarLabel>Suppliers</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/purchase-orders">
                        <ClipboardDocumentListIcon />
                        <SidebarLabel>Purchase Orders</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/inventory">
                        <Square3Stack3DIcon />
                        <SidebarLabel>Inventory</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/rfq">
                        <ClipboardDocumentIcon />
                        <SidebarLabel>RFQ</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/quotes">
                        <CurrencyDollarIcon />
                        <SidebarLabel>Quotes</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/orders">
                        <ShoppingCartIcon />
                        <SidebarLabel>Orders</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/invoices">
                        <ReceiptPercentIcon />
                        <SidebarLabel>Invoices</SidebarLabel>
                      </SidebarItem>
                      <SidebarItem href="/reports">
                        <ChartBarIcon />
                        <SidebarLabel>Reports</SidebarLabel>
                      </SidebarItem>
                    </SidebarSection>
                    <SidebarSection className="max-lg:hidden">
                      <SidebarHeading>Notifications</SidebarHeading>
                      <SidebarItem href="/inventory/low-stock">🚨 Low Inventory Alert: Steel Coils</SidebarItem>
                      <SidebarItem href="/orders/pending">📦 Pending Orders: 5 Unfulfilled</SidebarItem>
                      <SidebarItem href="/invoices/overdue">💰 Invoice Overdue: #INV-1023</SidebarItem>
                      <SidebarItem href="/rfq/new">📝 New RFQ: Acme Metals Ltd.</SidebarItem>
                      <SidebarItem href="/reports/sales">📊 Monthly Sales Report Ready</SidebarItem>
                    </SidebarSection>
                    <SidebarSpacer />
                    <SidebarSection>
                      <SidebarItem href="/support">
                        <QuestionMarkCircleIcon />
                        <SidebarLabel>Support</SidebarLabel>
                      </SidebarItem>
                    </SidebarSection>
                  </SidebarBody>
                  <SidebarFooter className="max-lg:hidden">
                    <Dropdown>
                      <DropdownButton as={SidebarItem}>
                        <span className="flex min-w-0 items-center gap-3">
                          <Avatar src="/profile-photo.jpg" className="size-10" square alt="" />
                          <span className="min-w-0">
                            <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                              Colin
                            </span>
                            <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                              colin@example.com
                            </span>
                          </span>
                        </span>
                        <ChevronUpIcon />
                      </DropdownButton>
                      <DropdownMenu className="min-w-64" anchor="top start">
                        <DropdownItem href="/my-profile">
                          <UserIcon />
                          <DropdownLabel>My profile</DropdownLabel>
                        </DropdownItem>
                        <DropdownItem href="/settings">
                          <Cog8ToothIcon />
                          <DropdownLabel>Settings</DropdownLabel>
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="/privacy-policy">
                          <ShieldCheckIcon />
                          <DropdownLabel>Privacy policy</DropdownLabel>
                        </DropdownItem>
                        <DropdownItem href="/share-feedback">
                          <LightBulbIcon />
                          <DropdownLabel>Share feedback</DropdownLabel>
                        </DropdownItem>
                        <DropdownDivider />
                        <DropdownItem href="/logout">
                          <ArrowRightStartOnRectangleIcon />
                          <DropdownLabel>Sign out</DropdownLabel>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </SidebarFooter>
                </Sidebar>
              }
            >
              {children}
            </SidebarLayout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
