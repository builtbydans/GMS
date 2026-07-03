import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { JobSummaryDto } from "@/types/job.types";
import { formatRelativeDate } from "@/utils/date";

interface ActivityTimelineProps {
  job: JobSummaryDto;
}

const ActivityTimeline = ({ job }: ActivityTimelineProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
      </CardHeader>

      <CardContent>
        {job.updates && job.updates.length > 0 ? (
          <div className="flow-root">
            {job.updates.map((update, index) => {
              const isLatest = index === 0;
              const isLast = index === job.updates.length - 1;

              return (
                <div
                  key={update.id}
                  className={cn(
                    "grid grid-cols-[1.5rem_1fr] gap-3",
                    !isLast && "pb-6",
                  )}
                >
                  <div className="relative flex justify-center">
                    {!isLast && (
                      <div
                        className={cn(
                          "absolute top-4 bottom-[-1.5rem] w-px bg-border",
                          isLatest && "bg-primary/40",
                        )}
                      />
                    )}
                    <div
                      className={cn(
                        "relative z-10 mt-1 flex size-4 items-center justify-center rounded-full border-2 bg-background",
                        isLatest
                          ? "border-primary ring-4 ring-primary/10"
                          : "border-muted-foreground/40",
                      )}
                    >
                      <div
                        className={cn(
                          "size-1.5 rounded-full",
                          isLatest ? "bg-primary" : "bg-muted-foreground/60",
                        )}
                      />
                    </div>
                  </div>

                  <div
                    className={cn(
                      "min-w-0 rounded-lg border bg-background p-3",
                      isLatest
                        ? "border-primary/30 bg-primary/5"
                        : "border-border/70 text-muted-foreground",
                    )}
                  >
                    <p
                      className={
                        isLatest ? "font-semibold" : "text-muted-foreground"
                      }
                    >
                      {update.message}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatRelativeDate(update.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No activity recorded yet.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityTimeline;
