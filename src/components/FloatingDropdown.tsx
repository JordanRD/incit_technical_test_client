import classNames from "classnames";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

type FloatingDropdownProps = HTMLAttributes<HTMLDivElement> & {
    anchorRef: React.RefObject<HTMLElement>;
    onOutsideClick: () => void;
};

function FloatingDropdown({
    anchorRef,
    onOutsideClick,
    ...props
}: FloatingDropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

    // console.log("🚀 > position:", position);
    useEffect(() => {
        const getPosition = () => {
            if (anchorRef.current && dropdownRef.current) {
                setPosition({
                    left: Math.min(
                        anchorRef.current.offsetLeft,
                        window.innerWidth -
                            (dropdownRef.current?.offsetWidth || 0) -
                            40
                    ),
                    top:
                        anchorRef.current.offsetTop +
                        anchorRef.current.offsetHeight * 0.75,
                });
            }
        };

        const handler = (event: MouseEvent) => {
            if (anchorRef.current && dropdownRef.current) {
                const targetElement = event.target as Node;
                if (
                    targetElement &&
                    !dropdownRef.current.contains(targetElement) &&
                    !anchorRef.current.contains(targetElement)
                ) {
                    onOutsideClick?.();
                }
            }
        };
        getPosition();
        document.addEventListener("click", handler);
        window.addEventListener("resize", getPosition);
        return () => {
            document.removeEventListener("click", handler);
            window.removeEventListener("resize", getPosition);
        };
    }, [anchorRef, dropdownRef, onOutsideClick]);
    // if (position.top > 0 || position.left > 0)
    return (
        <div
            {...props}
            ref={dropdownRef}
            className={classNames(
                "fixed bg-white drop-shadow-sm rounded-md duration-100 transition-opacity",
                props.className,
                position.top + position.left !== 0 ? "opacity-100" : "opacity-0"
            )}
            style={{ ...position, ...props.style }}
        />
    );
}

export default FloatingDropdown;
