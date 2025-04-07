import { useAuthStore } from "@/store/useAuthStore";
import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { StorageKeys } from "@/utils/storage-keys";
import { useStorage } from "@/hooks/useStorage";

export default function Index() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [hasOnboarded, _] = useStorage(StorageKeys.HasOnboarded, false);
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (rootNavigationState?.key) {
      if (!hasOnboarded) {
        router.replace("/(auth)/onboarding");
      } else if (!isLoggedIn) {
        router.replace("/(auth)/login");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [hasOnboarded, isLoggedIn, rootNavigationState]);

  return null;
}
