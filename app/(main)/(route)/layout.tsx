import SideBar from "@/components/custom/navigation/side-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
