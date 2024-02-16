import { MemberRole } from "@prisma/client";
import React, { FC, ReactNode } from "react";

interface AuthorityWrapperProps {
  children: ReactNode;
  role?: MemberRole;
  acceptedRoles?: MemberRole[];
}

const AuthorityWrapper: FC<AuthorityWrapperProps> = ({
  children,
  role,
  acceptedRoles = [],
}) => {
  const isView =
    acceptedRoles.length === 0 || !role || acceptedRoles.includes(role);
  return isView ? <>{children}</> : null;
};

export default AuthorityWrapper;
