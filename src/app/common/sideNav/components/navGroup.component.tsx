import { useState } from "react";
import { BsFillCaretDownFill } from "react-icons/bs";
import { useNavigation } from "react-auth-navigation";
import {
  useMeasure,
  useAnimatedValue,
  AnimatedBlock,
  AnimatedInline,
  interpolate,
} from "react-ui-animate";

interface NavGroupProps {
  title?: string;
  navItems?: any;
  onClick?: () => void;
  active: any;
  hasChild: any;
  icon: any;
}
export const NavGroup = ({
  title,
  navItems,
  onClick,
  active,
  hasChild,
  icon,
}: NavGroupProps) => {
  const [height, setHeight] = useState<any | any[]>(0);
  const bind = useMeasure(({ height: h }) => {
    setHeight(h);
  });
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useAnimatedValue(expanded ? height : 0);
  const { navigation } = useNavigation();

  return (
    <div className="sidenav-nav-group">
      <h3
        className={
          active
            ? hasChild
              ? "sidenav-nav-group-title hasChild"
              : "sidenav-nav-group-title active"
            : "sidenav-nav-group-title"
        }
        onClick={() => {
          !!onClick && onClick();
          navItems.length > 0 && setExpanded(!expanded);
        }}
      >
        <span className="sidenav-title">
          <span className="sidenav-title-icon">{icon}</span>
          <span className="sidenav-title-text">{title}</span>
        </span>

        {navItems.length > 0 && (
          <AnimatedInline
            style={{
              rotate: interpolate(animatedHeight.value, [0, height], [0, 180]),
            }}
            className="dropdownicon"
          >
            <BsFillCaretDownFill size={12} />
          </AnimatedInline>
        )}
      </h3>

      {navItems.length > 0 ? (
        <AnimatedBlock
          style={{
            height: animatedHeight.value,
            overflow: "hidden",
          }}
        >
          <ul
            {...bind()}
            className="sidenav-navitems"
            style={{ paddingBottom: 5 }}
          >
            {navItems.map(
              (
                { path, name, active }: { path: any; name: any; active: any },
                index: number
              ) => {
                return (
                  <li
                    key={index}
                    className={
                      active ? "navitems-item active" : "navitems-item"
                    }
                  >
                    <a
                      href={path}
                      onClick={(e) => {
                        e.preventDefault();
                        navigation.navigate(path);
                      }}
                    >
                      <span className="navitems-item-alias">
                        {name
                          .split(" ")
                          .map((v: any) => v[0])
                          .join("")}
                      </span>
                      <span className="navitems-item-name">{name}</span>
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </AnimatedBlock>
      ) : null}
    </div>
  );
};
