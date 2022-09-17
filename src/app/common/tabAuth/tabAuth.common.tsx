import { useNavigation } from "react-auth-navigation";
import { AnimatedBlock, useAnimatedValue, interpolate } from "react-ui-animate";

const TabItem = ({ active, path, name }: any) => {
  const { navigation } = useNavigation();
  const activeAnimation = useAnimatedValue(active, { duration: 100 });
  return (
    <li
      style={{ userSelect: "none" }}
      className={active ? "tab-list-item active" : "tab-list-item"}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          navigation.navigate(`${path}`);
        }}
      >
        <span className="title">{name}</span>

        <AnimatedBlock
          style={{
            scale: interpolate(activeAnimation.value, [0, 1], [0.8, 1]),
            opacity: activeAnimation.value,
          }}
          className="activeoverlay"
        />
      </div>
    </li>
  );
};

export const TabAuth = ({ group }: any) => {
  const {
    navigation: { routes },
  } = useNavigation();
  return (
    <div className="tab">
      {Object.keys(routes).map(
        (route, index) =>
          routes[route]?.props?.group === group && (
            <TabItem
              key={index}
              active={routes[route].active}
              path={routes[route].path}
              name={routes[route].name}
            />
          )
      )}
    </div>
  );
};
