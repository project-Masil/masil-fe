import { http, HttpResponse } from 'msw';
import {
  DEFAULT_CURSOR,
  DEFAULT_SIZE,
  END_POINT,
  SUCCESS_CODE,
} from '@/constants/api';
import { CafeLikeReqType, CafeListReqType } from '@/types/cafe';
import {
  ReviewCommentReqType,
  ReviewLikeReqType,
  ReviewListReqType,
} from '@/types/review';
import { mockCafeList } from './data/cafeList';
import { mockRecommendCafeList } from './data/recommendCafeList';
import { mockReviewCommentList } from './data/reviewCommentList';
import { mockReviewList } from './data/reviewList';

export const browserHandlers = [
  // Memo: 리뷰 리스트 조회
  http.post<never, ReviewListReqType>(
    END_POINT.REVIEW.LIST,
    async ({ request }) => {
      const { pagingData } = await request.json();
      const { lastPostId, pageSize } = pagingData;
      const cursor = lastPostId ?? DEFAULT_CURSOR;
      const size = pageSize ?? DEFAULT_SIZE;
      const nextList = mockReviewList.slice(cursor, cursor + size);

      const response = {
        status: SUCCESS_CODE.OK,
        message: '전체 리뷰 리스트 조회 성공',
        data: {
          reviews: nextList,
          meta: {
            hasNext: nextList.length <= DEFAULT_SIZE,
          },
        },
      };

      return HttpResponse.json(response, { status: SUCCESS_CODE.OK });
    }
  ),

  // Memo: 추천 카페 리스트 조회
  http.get(END_POINT.CAFE.RECOMMEND, async () => {
    return HttpResponse.json(mockRecommendCafeList, {
      status: SUCCESS_CODE.OK,
    });
  }),

  // Memo: 리뷰 좋아요 상태 변경
  http.patch<never, ReviewLikeReqType>(
    END_POINT.REVIEW.LIKE,
    async ({ request }) => {
      const { isLike } = await request.json();

      return HttpResponse.json(
        {
          status: SUCCESS_CODE.OK,
          message: '좋아요 상태 변경 성공',
          data: { isLike },
        },
        {
          status: SUCCESS_CODE.OK,
        }
      );
    }
  ),

  // Memo: 리뷰 댓글 리스트 조회
  http.get<ReviewCommentReqType>(
    END_POINT.REVIEW.COMMENT(':reviewId'),
    async () => {
      return HttpResponse.json(mockReviewCommentList, {
        status: SUCCESS_CODE.OK,
      });
    }
  ),

  // Memo: 카페 좋아요 상태 변경
  http.patch<never, CafeLikeReqType>(
    END_POINT.CAFE.LIKE,
    async ({ request }) => {
      const { isLike } = await request.json();

      return HttpResponse.json(
        {
          status: SUCCESS_CODE.OK,
          message: '좋아요 상태 변경 성공',
          data: { isLike },
        },
        {
          status: SUCCESS_CODE.OK,
        }
      );
    }
  ),

  http.post<never, CafeListReqType>(
    END_POINT.CAFE.LIST,
    async ({ request }) => {
      const { pagingData } = await request.json();
      const { lastPostId, pageSize } = pagingData;
      const cursor = lastPostId ?? DEFAULT_CURSOR;
      const size = pageSize ?? DEFAULT_SIZE;
      const nextList = mockCafeList.slice(cursor, cursor + size);

      const response = {
        status: SUCCESS_CODE.OK,
        message: '전체 카페 리스트 조회 성공',
        data: {
          cafeInfos: nextList,
          meta: {
            hasNext: nextList.length <= DEFAULT_SIZE,
          },
        },
      };

      return HttpResponse.json(response, { status: SUCCESS_CODE.OK });
    }
  ),
];
