import EditPayrollSettings from "@/components/user/Payroll/EditPayrollSettings";

export default async function EditPayroll({ params }: { params: { id: string } }) {
    const { id } = params;

    return (
        <main className="w-full">
            <EditPayrollSettings id={id} />
        </main>
    )
}
