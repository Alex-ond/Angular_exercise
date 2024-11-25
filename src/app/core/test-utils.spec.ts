import { DebugElement, Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { cold } from "jasmine-marbles";

export function createSingleCold(value: any) {
    return cold('a', { a: value })
}

export function queryByCss<T>(fixture: ComponentFixture<T>, selector: string) {
    return fixture.debugElement.query(By.css(selector));
}

export function queryAllByCss<T>(fixture: ComponentFixture<T>, selector: string) {
    return fixture.debugElement.queryAll(By.css(selector));
}

export function queryDebugElementAllByCss<T>(debugElement: DebugElement, selector: string) {
    return debugElement.queryAll(By.css(selector));
}

export function queryByDirective<T, U>(fixture: ComponentFixture<T>, type: Type<U>) {
    return fixture.debugElement.query(By.directive(type));
}

export function queryAllByDirective<T>(fixture: ComponentFixture<T>, type: Type<any>) {
    return fixture.debugElement.queryAll(By.directive(type));
}

export function getInnerText(element: DebugElement) {
    return (element.nativeElement as HTMLElement).innerText;
}