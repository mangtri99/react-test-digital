import { cn } from "@/lib/utils";
import React from "react";

const Title = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "text-slate-900 dark:text-slate-50 font-bold text-center text-2xl",
        className
      )}
      {...props}
    >
      {props.children}
    </h1>
  );
});

export default Title;
