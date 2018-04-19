(function (window, document, $) {
    'use strict';
    $(function () {
        var _searchItems = undefined;
        var _searchField = function(item, field, value) {
            var _targetField = item[field];

            if (typeof _targetField === 'string') {
                return _targetField.indexOf(value) !== -1;
            } else if(Array.isArray(_targetField)) {
                var _length = _targetField.length;
                var _isContain = false;
                for (var i = 0; i < _length; ++i) {
                    _isContain = _targetField[i] !== null && _targetField[i].indexOf(value) !== -1;
                    if (_isContain) {
                        break;
                    }
                }
                return _isContain;
            }
        };

        var _getSearchedItems = function(q) {
            var _length = _searchItems.length;
            var items = [];
            for (var i = 0; i< _length; ++i) {
                var item = _searchItems[i];
                if (item) {
                    if (
                        _searchField(item, 'title', q) ||
                        _searchField(item, 'author', q) ||
                        _searchField(item, 'tags', q)
                    ) {
                        items.push(item);
                    }
                }
            }
            return items;
        };

        var _displayResult = function(element) {
            $('#search-result').html(element);
        }

        var search = function(q) {
            if (_searchItems === undefined) {
                return;
            }

            var searchedItems = _getSearchedItems(q);
            var _length = searchedItems.length;

            if (_length === 0) {
                _displayResult('<h4>검색결과없음</h4>')
            } else {
                var ul = $('<ul></ul>');
                for (var i = 0; i < _length; ++i) {
                    var item = searchedItems[i];
                    ul.append(
                        $('<li></li>').append(
                            $('<a></a>')
                                .attr({ href: item.href })
                                .html(item.title + ' - ' + item.author)
                        )
                    );
                }
                _displayResult(ul);
            }
        };

        $('#search-form').on('submit', function(e) {
            e.stopPropagation();
            e.preventDefault();

            var q = $(e.target).find('input[name=q]').val();
            if (q === undefined || q.trim() === '') {
                alert('검색어를 입력해주세요.');
                return;
            }

            if (_searchItems === undefined) {
                $.getJSON("/search.json", function(data) {
                    _searchItems = data;
                    search(q);
                });
            } else {
                search(q);
            }
        });
    });
}(window, window.document, window.jQuery));