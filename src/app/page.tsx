import { Suspense } from "react";
import { getExpenseList } from "@/actions/get_expense_list";
import { ExpenseResume } from "@/components/expense-resume";
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
import { Button } from "@/components/ui/glass/button";
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
    <div className="min-h-dvh w-full bg-zinc-900">
      <header className="pt-12 pb-24 bg-gray-900">
        <div className="flex items-center justify-between max-w-[90%] xl:max-w-[1260px] w-full mx-auto">
          <Logo />
          <Suspense fallback={<ProfileCardSkeleton />}>
            <div className="flex items-center gap-2">
              <ProfileCard />
              <ModeToggle />
            </div>
          </Suspense>
        </div>
      </header>
      <ExpenseResume totalExpenses={expenses} />
      {/*<main className="max-w-[90%] xl:max-w-[1260px] mx-auto mt-16">
        <Suspense key={queryParams} fallback={<ExpenseTableSkeleton />}>
          <ExpenseTable queryParams={queryParams} />
        </Suspense>
      </main>*/}
    </div>
  );
}
