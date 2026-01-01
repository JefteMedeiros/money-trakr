import { Suspense } from "react";
import { getExpenseList } from "@/actions/get_expense_list";
import { ExpenseResume } from "@/components/expense-resume";
import { ExpenseTable } from "@/components/expense-table";
import { Logo } from "@/components/logo";
import { ProfileCard } from "@/components/profile-card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

function Loading() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-2">
        <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-12 animate-pulse" />
        <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-12 animate-pulse" />
        <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-12 animate-pulse" />
      </div>
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
      <Skeleton className="flex items-center px-4 justify-between gap-4 rounded-md w-full bg-gray-600 h-20 animate-pulse" />
    </div>
  );
}

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
    <div className="bg-gray-800 min-h-dvh w-full">
      <header className="pt-12 pb-24 bg-gray-900">
        <div className="flex items-center justify-between max-w-[90%] xl:max-w-[1260px] w-full mx-auto">
          <Logo />
          <Suspense fallback={<p>Loading...</p>}>
            <ProfileCard />
          </Suspense>
        </div>
      </header>
      <ExpenseResume totalExpenses={expenses} />
      <main className="max-w-[90%] xl:max-w-[1260px] mx-auto mt-16">
        <Suspense key={queryParams} fallback={<Loading />}>
          <ExpenseTable queryParams={queryParams} />
        </Suspense>
      </main>
    </div>
  );
}
