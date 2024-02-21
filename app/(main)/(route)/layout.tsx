import SideBar from "@/components/custom/navigation/side-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-[72px] h-screen">
        <SideBar />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
}
