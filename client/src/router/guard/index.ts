import {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
} from "vue-router";
import useTotalStore from "../../store/TotalStore";

export default function routerGuard(router: Router): void {
  router.beforeEach(
    async (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const store = useTotalStore();
      if (to.path !== "/login") {
        if (to.path == "/pdf") {
          store.initValue();
        }
        const localToken = localStorage.getItem("token");
        localStorage.clear();
        if (localToken) {
          localStorage.setItem("token", localToken);
          next();
        } else {
          next("/login");
        }
      } else {
        if (from.path == "/pdf") {
          localStorage.clear();
        }
        next();
      }
    }
  );
}
