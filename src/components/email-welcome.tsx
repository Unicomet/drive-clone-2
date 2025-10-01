import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome to Drive Clone, {firstName}!</h1>
    </div>
  );
}
