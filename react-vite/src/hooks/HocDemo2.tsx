import { Button, Empty } from "antd";
import { useEffect, useState } from "react";

const trackService = {
  sendEvent: <T,>(trackType: string, data?: T) => {
    const eventData = {
      timestamp: new Date().toISOString(),
      trackType,
      data,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    console.log("eventData", eventData);
    navigator.sendBeacon("http://127.0.0.1:5173", JSON.stringify(eventData));
  },
};

const withTrack = (
  Component: React.FC<{
    trackEvent: (eventType: string, data?: Record<string, unknown>) => void;
  }>,
  trackType: string,
) => {
  return (props: Record<string, unknown>) => {
    useEffect(() => {
      trackService.sendEvent<{ username: string }>(`${trackType}-mount`, {
        username: "whoami",
      });
      return () => {
        trackService.sendEvent<{ username: string }>(`${trackType}-unmount`, {
          username: "whoami",
        });
      };
    }, []);

    const trackEvent = (eventType: string, data?: Record<string, unknown>) => {
      trackService.sendEvent<Record<string, unknown>>(
        `${trackType}-${eventType}`,
        data,
      );
    };

    return <Component {...props} trackEvent={trackEvent} />;
  };
};

const RawButton = (props: {
  trackEvent: (eventType: string, data?: Record<string, unknown>) => void;
}) => {
  const { trackEvent } = props;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackEvent(e.type, {
      type: e.type,
      clientX: e.clientX,
      clientY: e.clientY,
    });
  };
  return <button onClick={handleClick}>button-{JSON.stringify(props)}</button>;
};

const TrackedButton = withTrack(RawButton, "button" /** trackType */);

export default function HocDemo2() {
  const [isMounted, setIsMounted] = useState(true);
  return (
    <>
      <Button onClick={() => setIsMounted(!isMounted)}>setIsMounted</Button>
      {isMounted ? <TrackedButton a={1} b={2} c={3} /> : <Empty />}
    </>
  );
}
