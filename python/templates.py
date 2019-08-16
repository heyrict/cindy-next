class en:
    ADD_PUZZLE_TWEET = ''
    BOM_TWEET_MESSAGE = ''
    BOM_TWEET_MESSAGE_SHORT = ''
    BOM_RANKING_MESSAGE = ''
    BOM_COLLECTION_ADD_MESSAGE = ''


class ja:
    ADD_PUZZLE_TWEET = \
        '%(user_nickname)sさんがCindyにて新しい問題'\
        '『%(title)s』を出題しました。\n'\
        'https://www.cindythink.com/puzzle/%(id)d\n'\
        '#ウミガメのスープ'

    BOM_TWEET_MESSAGE_SHORT = '%(header)s\nhttps://www.cindythink.com/ranking/puzzleStar\n#ウミガメのスープ'

    BOM_TWEET_MESSAGE = '%(year)4d年%(month)2d月にCindyで最も評価された問題を発表しまーす！\n\n%(ranking)s\n \n'\
                        'そして、第一位を獲得した %(user_nickname)s さんに、%(month)2d 月の称号「%(award_name)s」'\
                        'を付与します！おめでとうございます！\n'\
                        'https://www.cindythink.com/ranking/puzzleStar\n'\
                        '#ウミガメのスープ'

    BOM_RANKING_MESSAGE = '第 %(no)d 位：%(star__count)2d 人から %(star__sum)2d のスターを獲得した'\
                          ' %(user_nickname)s さんの問題「%(title)s」\n'\
                          'https://www.cindythink.com/puzzle/%(id)d\n'

    BOM_COLLECTION_ADD_MESSAGE = '%(nickname)s さんが %(count)s つの月間ランキング称号を入賞したので、'\
                                 '限定称号 %(award_name)s を手に入れました！\n'\
                                 'おめでとうございます！'
