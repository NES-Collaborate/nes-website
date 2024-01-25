import ExpenseLogStats from "@/components/app/admin/finance/ExpenseLogStats"
import ExpenseLogs from "@/components/app/admin/finance/ExpenseLogs"
import { withAuth } from "@/utils/auth"

type FinanceProps = {
  currentBalance: number
  totalExpenses: number
}

const Finance = (props: FinanceProps) => {
  return (
    <>
      <h1 className="text-2xl text-center my-3 font-semibold">Gestão Financeira</h1>

      <div className="container mx-auto">
        <ExpenseLogStats {...props} />
        <ExpenseLogs />
      </div>
    </>
  )
}

export default Finance

export const getServerSideProps = withAuth({
  callback: async (ctx) => {
    return {
      props: {
        current: 1,
      },
    }
  },

  allowedUsers: ["admin"],
})
