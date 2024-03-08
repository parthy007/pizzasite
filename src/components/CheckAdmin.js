import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useCheckAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!isAdmin) {
        const res = await getSession();
        if (!res?.user?.admin) {
          router.push("/");
        } else {
          setIsAdmin(true);
        }
      }
    };
    checkAdmin();
    setLoading(false);
  }, [isAdmin]);

  return { loading, isAdmin };
}
