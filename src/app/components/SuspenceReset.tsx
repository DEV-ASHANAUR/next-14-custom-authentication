import { useSearchParams } from "next/navigation";

const SuspenseResetPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  if (!id && !token) return null;

  return { id, token };
};

export default SuspenseResetPage;

