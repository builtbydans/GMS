import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          <div className="space-y-6">
            {job.updates.map((update, index) => {
              const isLatest = index === 0;

              return (
                <div
                  key={update.id}
                  className={`flex gap-4 ${!isLatest ? "opacity-50" : ""}`}
                >
                  <div
                    className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${
                      isLatest ? "bg-primary" : "bg-muted-foreground"
                    }`}
                  />

                  <div className="flex-1">
                    <p
                      className={
                        isLatest ? "font-semibold" : "text-muted-foreground"
                      }
                    >
                      {update.message}
                    </p>

                    <p className="text-muted-foreground text-sm">
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
