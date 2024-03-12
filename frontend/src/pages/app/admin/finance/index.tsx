import ExpenseLogStats from "@/components/app/admin/finance/ExpenseLogStats"
import ExpenseLogs from "@/components/app/admin/finance/ExpenseLogs"
import { ExpenseLogsProvider } from "@/contexts/expenseLogs"
import { withAuth } from "@/utils/auth"

const Finance = () => {
  return (
    <>
      <h1 className="text-2xl text-center my-3 font-semibold">Gestão Financeira</h1>

      <div className="container mx-auto w-11/12">
        <ExpenseLogsProvider>
          <ExpenseLogStats />
          <ExpenseLogs />
        </ExpenseLogsProvider>
      </div>
    </>
  )
}

export default Finance

export const getServerSideProps = withAuth({
  allowedUsers: ["admin"],
})
