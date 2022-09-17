import { useState, useImperativeHandle, forwardRef, useEffect } from "react";

type ShapeType = {
  render: () => {};
  title: string;
  onClick?: (arg: any) => {};
};

interface TabProps {
  panes: ShapeType[];
  onTabChange: (arg: any) => {};
  activeUserProp: any;
}

export const Tab = forwardRef((props: TabProps, ref) => {
  const { panes, onTabChange, activeUserProp } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(null);

  useImperativeHandle(ref, () => ({
    activateIndex: (index: any) => {
      setActiveIndex(index);
    },
  }));

  useEffect(() => {
    setActiveTab(panes[activeIndex]);
  }, [activeIndex, panes]);

  useEffect(() => {
    onTabChange && onTabChange(activeIndex);
  }, [activeIndex, onTabChange]);

  useEffect(() => {
    activeUserProp && setActiveIndex(1);
  }, [activeUserProp]);

  return (
    <div className="tab-v1">
      <div className="tab-v1-title">
        {panes.map(({ title, onClick }, index) => {
          return (
            <div
              key={index}
              onClick={
                onClick
                  ? () => onClick(activeIndex)
                  : () => setActiveIndex(index)
              }
              className={
                activeIndex === index
                  ? "tab-v1-title-text active"
                  : "tab-v1-title-text"
              }
            >
              {title}
            </div>
          );
        })}
      </div>
      {activeTab && <div className="tab-v1-content">{activeTab.render()}</div>}
    </div>
  );
});
