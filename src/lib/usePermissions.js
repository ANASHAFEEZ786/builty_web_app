import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPermissions, hasPermission as checkPermission, isAdmin as checkIsAdmin } from './permissions';

/**
 * Hook for using permissions in components
 * @param {string} module - Module name (e.g., 'stations', 'drivers')
 * @returns {Object} Permission helpers
 */
export const usePermissions = (module) => {
    const { user } = useAuth();

    const permissions = useMemo(() => {
        const perms = getPermissions(user, module);
        return {
            ...perms,
            canView: perms.view,
            canAdd: perms.add,
            canEdit: perms.edit,
            canDelete: perms.delete,
            isAdmin: checkIsAdmin(user),
            hasPermission: (action) => checkPermission(user, module, action)
        };
    }, [user, module]);

    return permissions;
};

/**
 * Hook to check if user is admin
 */
export const useIsAdmin = () => {
    const { user } = useAuth();
    return checkIsAdmin(user);
};

export default usePermissions;
