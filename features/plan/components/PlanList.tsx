import useGetPlans from "@/features/plan/hooks/useGetPlans";
import { PlanCard } from "@/features/plan/components/PlanCard";

export function PlanList() {
  const {data: plans} = useGetPlans();
  return (
    <div className="flex flex-col space-y-4 mt-4">
      <h2 className="text-2xl font-bold">My Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {plans?.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}