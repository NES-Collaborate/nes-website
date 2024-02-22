import ExpenseLogStats from "@/components/app/admin/finance/ExpenseLogStats"
import ExpenseLogs from "@/components/app/admin/finance/ExpenseLogs"
import { ExpenseLogsProvider } from "@/contexts/expenseLogs"
import { withAuth } from "@/utils/auth"
import { axiosServer } from "@/utils/axiosClient"

type FinanceProps = {
  currentBalance: number
  totalExpenses: number
}

const Finance = (props: FinanceProps) => {
  return (
    <>
      <h1 className="text-2xl text-center my-3 font-semibold">Gestão Financeira</h1>

      <div className="container mx-auto w-11/12">
        <ExpenseLogsProvider>
          <ExpenseLogStats {...props} />
          <ExpenseLogs />
        </ExpenseLogsProvider>
      </div>
    </>
  )
}

export default Finance

export const getServerSideProps = withAuth({
  callback: async ({ req }) => {
    try {
      const res = await axiosServer.get("/admin/finance/stats", {
        headers: {
          Authorization: `Bearer ${req.cookies._token}`,
        },
      })

      return {
        props: res.data,
      }
    } catch {
      return {
        redirect: {
          destination: "/app/admin",
          permanent: false,
        },
      }
    }
  },

  allowedUsers: ["admin"],
})
