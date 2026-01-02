import { Suspense } from "react";
import { getExpenseList } from "@/actions/get_expense_list";
import { ExpenseStats } from "@/components/expense-stats";
import { ExpenseTable } from "@/components/expense-table";
import { Logo } from "@/components/logo";
import { ProfileCard } from "@/components/profile-card";
import {
  ExpenseTableSkeleton,
  ProfileCardSkeleton,
} from "@/components/loading-skeleton";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const queryParams = new URLSearchParams(searchParams as any).toString();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/signin");

  const expenses = await getExpenseList(queryParams);

  return (
    <div className="min-h-dvh w-full relative">
      {/* Background with blur */}
      <div className="fixed inset-0 -z-10 bg-[url('/bg-shape-light.png')] dark:bg-[url('/bg-shape.jpg')] bg-cover bg-center bg-no-repeat blur-3xl" />

      <header className="pt-6 md:pt-12 pb-16 md:pb-24">
        <div className="flex items-center justify-between max-w-[90%] xl:max-w-315 w-full mx-auto gap-2">
          <Logo />
          <Suspense fallback={<ProfileCardSkeleton />}>
            <div className="flex items-center gap-1 md:gap-2">
              <ModeToggle />
              <ProfileCard />
            </div>
          </Suspense>
        </div>
      </header>
      <ExpenseStats totalExpenses={expenses} />
      <main className="max-w-[90%] xl:max-w-315 mx-auto mt-16 md:mt-20 mb-8">
        <Suspense key={queryParams} fallback={<ExpenseTableSkeleton />}>
          <ExpenseTable queryParams={queryParams} />
        </Suspense>
      </main>
    </div>
  );
}
