"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";


export const Navbar = ({ children, className }) => {
    const ref = useRef(null);
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setVisible(latest > 80);
    });

    return (
        <motion.div
            ref={ref}

            className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child, { visible })
                    : child,
            )}
        </motion.div>
    );
};

export const NavBody = ({ children, className, visible }) => {
    return (
        <motion.div
            animate={
                visible
                    ? {
                        width: "70%",
                        maxWidth: "900px",
                        marginTop: "12px",
                        borderRadius: "9999px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingLeft: "24px",
                        paddingRight: "24px",
                        backgroundColor: "rgba(255,255,255,0.97)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    }
                    : {
                        width: "100%",
                        maxWidth: "100%",
                        marginTop: "0px",
                        borderRadius: "0px",
                        paddingTop: "18px",
                        paddingBottom: "18px",
                        paddingLeft: "32px",
                        paddingRight: "32px",
                        backgroundColor: "rgba(255,255,255,0)",
                        boxShadow: "none",
                    }
            }
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "relative z-[60] mx-auto hidden flex-row items-center justify-between self-start lg:flex",
                className,
            )}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child, { visible })
                    : child,
            )}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick, visible }) => {
    const [hovered, setHovered] = useState(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition duration-200 lg:flex",
                className,
            )}
        >
            {items.map((item, idx) => (
                <a
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={onItemClick}
                    style={{
                        color: hovered === idx
                            ? "#f97316"
                            : visible ? "#1f2937" : "#ffffff",
                    }}
                    className="relative px-3 py-2 font-semibold transition-colors duration-200"
                    key={`link-${idx}`}
                    href={item.link}
                >
                    <span className="relative z-20">{item.name}</span>
                    <span
                        style={{
                            transform: hovered === idx ? "scaleX(1)" : "scaleX(0)",
                            backgroundColor: "#f97316",
                        }}
                        className="absolute bottom-0 left-0 h-0.5 w-full origin-left transition-transform duration-300 rounded-full"
                    />
                </a>
            ))}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible }) => {
    return (
        <motion.div
            animate={
                visible
                    ? {
                        backgroundColor: "rgba(255,255,255,0.97)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }
                    : {
                        backgroundColor: "rgba(255,255,255,0)",
                        boxShadow: "none",
                        paddingTop: "14px",
                        paddingBottom: "14px",
                    }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                "relative z-50 mx-auto flex w-full flex-col items-center justify-between px-4 lg:hidden",
                className,
            )}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(child, { visible })
                    : child,
            )}
        </motion.div>
    );
};

export const MobileNavHeader = ({
    children,
    className,
}) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-between",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const MobileNavMenu = ({
    children,
    className,
    isOpen,
    onClose,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white px-4 py-8 shadow-xl",
                        className,
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({
    isOpen,
    onClick,
    visible,
}) => {
    return isOpen ? (
        <IconX style={{ color: visible ? "#1f2937" : "#ffffff" }} onClick={onClick} />
    ) : (
        <IconMenu2 style={{ color: visible ? "#1f2937" : "#ffffff" }} onClick={onClick} />
    );
};

export const NavbarLogo = ({ visible }) => {
    return (
        <a
            href="/"
            className="relative z-20 mr-4 flex items-center space-x-1 px-2 py-1 shrink-0"
        >
            <span
                style={{ color: visible ? "#1e3a8a" : "#ffffff" }}
                className="font-bold text-xl transition-colors duration-300"
            >
                XYZ
            </span>
            <span className="text-india-saffron-500 font-bold text-xl"> Tours</span>
        </a>
    );
};

export const NavbarButton = ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    visible,
    ...props
}) => {
    const baseStyles =
        "px-4 py-2 rounded-full whitespace-nowrap shrink-0 text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

    const variantStyles = {
        primary: visible
            ? "bg-india-blue-700 text-white shadow-md hover:bg-india-blue-800"
            : "bg-white text-gray-900 shadow-md hover:bg-gray-100",
        secondary: visible
            ? "bg-transparent text-gray-800"
            : "bg-transparent text-white",
        dark: "bg-black text-white shadow-md",
        gradient:
            "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
    };

    return (
        <Tag
            href={href || undefined}
            className={cn(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Tag>
    );
};
