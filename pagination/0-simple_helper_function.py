#!/usr/bin/env python3
"""
Simple helper function
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    function named index_range that takes two integer
    arguments page and page_size
    """
    start: int = (page - 1) * page_size
    end: int = page_size * page
    return (start, end)
