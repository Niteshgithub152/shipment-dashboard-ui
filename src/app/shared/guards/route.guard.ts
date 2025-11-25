import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AppService } from "../../core/services/app.service";

function hasAccess() {
    const appService = inject(AppService);
    if (appService.user.role) {
        return true;
    }

    const router = inject(Router);
    router.navigate(['/']);
    return false;
}

export const routeGuard: CanActivateFn = (_route, _state) => hasAccess();